import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { ormCreateMatchRequest } from "../user-service/model/match-request-model-orm.js";
import {
  deleteMatch,
  getMatchUsername,
  getMatchDifficulty,
} from "../user-service/model/repository.js";

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

  socket.on("match", async (args) => {
    const username = args["username"];
    const difficulty = args["difficulty"];

    const [matchedUser, userInQueue] = await Promise.all([
      getMatchDifficulty(difficulty),
      getMatchUsername(username),
    ]);

    if (!userInQueue && matchedUser) {
      deleteMatch(matchedUser);
      socket.emit("Success", "Match with same difficulty found.");
      io.to(matchedUser["socketId"]).emit(
        "Success",
        "Match with same difficulty found."
      );
    } else if (!userInQueue) {
      ormCreateMatchRequest(username, difficulty, socket.id);
      socket.emit("Success", "User added to matching queue");
    } else {
      socket.emit("Error", "User already in being matched.");
    }
  });
});
