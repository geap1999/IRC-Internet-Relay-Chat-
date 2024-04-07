const pgClient = require("../services/pgClient");

export async function selectUsers() {
  const sqlQuery = "SELECT * FROM users";

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQuery);
    result = response.rows;

  } catch (error) {
    console.log(error);
  }
  return { error, result };
};

export async function selectChannels() {
  const sqlQuery = "SELECT title FROM channels";

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQuery);
    result = response.rows;

  } catch (error) {
    console.log(error);
  }
  return { error, result };
};

export async function insertUser(newUser: { username: string; email: string; password: string; }) {
  try {
    const sqlQueryCheckEmail = 'SELECT * FROM users WHERE email = $1';
    const checkEmailResult = await pgClient.query(sqlQueryCheckEmail, [newUser.email]);

    if (checkEmailResult.rows.length > 0) {
      return { status: 400, message: "User already exists!" };
    }

    const sqlQueryCreateUser = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const createUserValues = [newUser.username, newUser.email, newUser.password];
    const sqlQueryCreateUserResult = await pgClient.query(sqlQueryCreateUser, createUserValues);

    return { status: 201, message: "User has been created." };

  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while processing your request." };
  }
};

export async function selectUser(data: { email: string; password: string; }) {
  const sqlQueryEmail = 'SELECT * FROM users WHERE users.email = $1';

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQueryEmail, [data.email]);
    const user = response.rows[0];

    if (!user) {
      console.log("User not found");
      return { error, result };
    }

    result = { username: user.username, password: user.password };
  } catch (error) {
    console.log(error);
  }
  return { error, result };
};

export async function createChannel(channel: { title: string; status: boolean; }) {
  const sqlQueryInsertChannel = 'INSERT INTO channels (title, status) VALUES ($1, $2)';

  const createChannelValues = [channel.title, channel.status];

  try {
    const sqlQueryCreateUserResult = await pgClient.query(sqlQueryInsertChannel, createChannelValues);
    return { status: 201, message: "Channel has been created." };
  } catch (error) {
    console.log(error);
    console.error(error);
    return { status: 500, message: "An error occurred while processing your request." };
  }
};

export async function getLastChannelCreated() {
  const sqlQueryLastChannelId = 'SELECT * FROM channels ORDER BY id DESC LIMIT 1';

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQueryLastChannelId);
    result = response.rows
  } catch (error) {
    console.log(error);
  }
  return { error, result };
}

export async function getChannelInfo(id: number) {
  const sqlQueryChannelInfo = `SELECT * FROM channels WHERE id = ${id}`;

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQueryChannelInfo);
    result = response.rows
  } catch (error) {
    console.log(error);
  }
  return { error, result };
}

export async function getUserInfo(id: number) {
  const sqlQueryUserInfo = `SELECT * FROM users WHERE id = ${id}`;

  let result;
  let error;

  try {
    const response = await pgClient.query(sqlQueryUserInfo);
    result = response.rows
  } catch (error) {
    console.log(error);
  }
  return { error, result };
}
