import { Request, Response } from "express";
import path from 'path';
const { Router } = require("express");
const router = Router();
const userControllers = require ("./controllers/usersControllers");

router.get("/", (req:Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views/signIn.html'));
});

router.get("/register", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views/register.html'));
});

router.post("/register", userControllers.register);

router.post("/signIn", userControllers.signIn);

router.get("/signIn", userControllers.signIn);

router.get("/chatRoom", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views/chatroom.html'));
});

router.post("/createChannel", userControllers.createRoom);

router.get("/channels/:id", userControllers.getPrivateChannel);

router.get("/users", userControllers.getAllUsers);

router.get("/users/:id", userControllers.getUser);

router.post("/logout", userControllers.logout);

router.get("/api/rooms", userControllers.getAllRooms);

module.exports = router;