import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const log = console.log; // initialize http server, socket.io and port number
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
const port = 3001;
httpServer.listen(port, () => log(`server listening on port: ${port}`));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("room", function (data) {
    console.log("roomJoined");
    socket.join(data.roomID);
  });

  socket.on("leave room", (data) => {
    socket.leave(data.roomID);
  });

  socket.on("coding event", function (data) {
    console.log("coding event");
    socket.broadcast.to(data.roomID).emit("receive code", data);
  });

  socket.on("set question", function (data) {
    console.log("set question");
    socket.broadcast.to(data.roomID).emit("set question", data);
  });
});

io.on("disconnect", (evt) => {
  log("some people left");
});
