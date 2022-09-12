import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { ormCreateMatchRequest } from "../user-service/model/match-request-model-orm.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

httpServer.listen(8001, () => {
  console.log("listening on *:8001");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("match", (username, difficulty) => {
    ormCreateMatchRequest(username, difficulty);
  });
});
