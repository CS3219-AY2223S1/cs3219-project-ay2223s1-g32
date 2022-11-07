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
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
var roomID = 1;

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
      socket.emit("SuccessMatched", "Match with same difficulty found.", roomID);
      io.to(matchedUser["socketId"]).emit(
        "Success",
        "Match with same difficulty found.",
        roomID,
      );
      return;
    } else if (!userInQueue) {
      ormCreateMatchRequest(username, difficulty, socket.id);
      socket.emit("Success", "User added to matching queue");
      var count = 0;
      const interval = setInterval(async () => {
        const userStillInQueue = await getMatchUsername(username);
        if (!userStillInQueue) {
          socket.emit("SuccessMatched", "Match with same difficulty found.", roomID);
          roomID++;
          clearInterval(interval);
        }
        count++;
        if(count == 30 && userStillInQueue) {
          await deleteMatch(userStillInQueue);
          socket.emit("TimeoutError", "Match not found in 30s");
          clearInterval(interval); 
        }
      }, 1000);
    } else {
      socket.emit("Error", "User already in being matched.");
    }
  });
});
