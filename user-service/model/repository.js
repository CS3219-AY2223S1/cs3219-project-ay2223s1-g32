import UserModel from './user-model.js';
import 'dotenv/config'
import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params);
}

export async function isExistingUser(username) {
  const existingUser = await UserModel.findOne({ username: username });
  return !!existingUser;
}

export async function isValidLogin(username, password) {
  const user = await UserModel.findOne({ username: username });
  const isValidLogin = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  return isValidLogin;
}

export async function getUserToken(username) {
  const token = jsonwebtoken.sign({ username }, process.env.SECRET);
  return token;
}
