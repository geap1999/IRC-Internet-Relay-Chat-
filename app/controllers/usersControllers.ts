import { Request, Response } from "express";
import { selectUsers, insertUser, selectUser, selectChannels, createChannel, getUserInfo, getChannelInfo} from "../models/dataMapper";
import { generateAccessToken } from "../services/jwtAuth";
const bcrypt = require('bcrypt');

// Récupération de l'ensemble des users du dataMapper
export async function getAllUsers(req: Request, res: Response) {
  const { error, result } = await selectUsers();
  if (error) {
    return (error)
  } else if (result) {
    res.status(200).json(result);
  }
};

// Récupération de la création d'un utilisateur avec les conditions nécessaires
export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide username, email, and password." });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const registerResult = await insertUser({username, email, password: hashedPassword});

    if (registerResult.status === 201) {
      res.redirect("/");
    } else {
      return res.status(registerResult.status).json({ message: registerResult.message });
    }

  } catch {
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
};

// Récupération de la connexion d'un utilisateur avec les conditions nécessaires
export async function signIn(req: Request, res: Response) {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    if (!data.email || !data.password) {
      return res.status(400).json({ message: "Please enter both email and password." });
    }

    const { error, result } = await selectUser(data);

    if (error) {
      return res.status(500).json({ message: "An error occurred while processing your request." });
    } else if (!result){
      return res.status(404).json({message: "User does not exist."});
    }

    const checkMatchingPassword = await bcrypt.compare(req.body.password, result.password);

    if(checkMatchingPassword){
      const token = generateAccessToken(data.email);
      
      if(token){
        res.redirect("/chatRoom");
        res.status(200).json({status: true, token: token });
      } else {
        res.status(500).json({status: false, message:"Failed to generate token"});
      }
    } else {
      res.status(401).send('Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

// Récupération de la création d'un channel avec les conditions nécessaires
export async function createRoom(req: Request, res: Response) {
  const channel = {
    title: req.body.name,
    status: false,
    invite: req.body.email,
  }

  if (req.body.choose_status === "public") {
    channel.status = true;
  }

  const createTableResult = await createChannel(channel);
  if (createTableResult.status === 201) {
    res.redirect("/chatRoom")
  } else {
    return res.status(createTableResult.status).json({message: createTableResult.message});
  }
};

// Récupération des channels depuis le dataMapper
export async function getAllRooms(req: Request, res: Response) {
  const { error, result } = await selectChannels();

  if (error) {
    return (error)
  } else if (result) {
    res.status(200).json(result);
  }
};
// Récupération de la création d'un utilisateur avec les conditions nécessaires
export async function getPrivateChannel(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { error, result } = await getChannelInfo(id);
  if (error) {
    return res.status(400).json({ error });
  } else if (result) {
    res.status(200).json(result);
  }
}

// Récupération d'un utilisateur en fonction de son id
export async function getUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { error, result } = await getUserInfo(id);
  if (error) {
    return res.status(400).json({ error });
  } else if (result) {
    res.status(200).json(result);
  }
}

// Préparation du controller pour se déconnecter
export async function logout(req: Request, res: Response) {
  res.redirect("/");
}