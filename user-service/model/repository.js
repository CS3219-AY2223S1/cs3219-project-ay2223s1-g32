import UserModel from "./user-model.js";
import "dotenv/config";
import MatchRequestModel from "./match-request-model.js";
//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
  return new UserModel(params);
}

export async function createMatchRequest(params) {
  return new MatchRequestModel(params);
}

export async function deleteMatch(username) {
  await MatchRequestModel.findByIdAndRemove(username);
}

export async function getMatchUsername(username) {
  const existingMatchRequest = await MatchRequestModel.findOne({
    username: username,
  });
  return existingMatchRequest;
}

export async function getMatchDifficulty(difficulty) {
  const existingMatchRequest = await MatchRequestModel.findOne({
    difficulty: difficulty,
  });
  return existingMatchRequest;
}
