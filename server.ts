require('dotenv').config();
import express from "express";
const bodyParser = require('body-parser');
const path=require('path');
const app = express();
const router = require('./app/router');
const PORT = process.env.PORT;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection", (socket: any) => {
    console.log("Un utilisateur s\'est connecté.")

    socket.on("chat message", (msg: string) => {
      io.emit("chat message", msg);
    })
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(router);

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}...`);
});