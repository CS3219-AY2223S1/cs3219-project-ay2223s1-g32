import UserModel from "./user-model.js";
import BlacklistedTokenModel from "./blacklisted-token-model.js";
import "dotenv/config";
import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
  process.env.ENV == "DEV"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
  return new UserModel(params);
}

export async function updateUser(id, params) {
  await UserModel.findByIdAndUpdate(id, params, { new: true });
}

export async function deleteUser(id) {
  await UserModel.findByIdAndRemove(id);
}

export async function getUser(username) {
  const existingUser = await UserModel.findOne({ username: username });
  return existingUser;
}

export async function getHashedPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function isValidLogin(username, password) {
  const user = await UserModel.findOne({ username: username });
  const isValidLogin = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  return isValidLogin;
}

export async function createBlacklistedToken(params) {
  return new BlacklistedTokenModel(params);
}

export async function getBlacklistedToken(token) {
  const blacklistedToken = await BlacklistedTokenModel.findOne({
    token: token,
  });
  return blacklistedToken;
}

export async function getUserToken(username) {
  const user = await getUser(username);
  const token = jsonwebtoken.sign(
    { username: username, id: user.id },
    process.env.SECRET
  );
  return token;
}

export function getRequestToken(token) {
  const bearer = "bearer ";

  return token && token.toLowerCase().startsWith(bearer)
    ? token.substring(bearer.length)
    : null;
}

export async function getTokenUser(token) {
  try {
    const decodedToken = token
      ? jsonwebtoken.verify(token, process.env.SECRET)
      : null;
    const isBlacklistedToken = await getBlacklistedToken(token);

    const user =
      decodedToken && !isBlacklistedToken
        ? await UserModel.findById(decodedToken.id)
        : null;

    return user;
  } catch (error) {
    return null;
  }
}
