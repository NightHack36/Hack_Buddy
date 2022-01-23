import express from "express";
import http from "http";
import socketIo from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new socketIo.Server(server);

io.on("connection", (conn) => {
  console.log(conn);
});

const port = process.env.PORT;

server.listen(port, () => console.log(`Server is started on port ${port}`));
