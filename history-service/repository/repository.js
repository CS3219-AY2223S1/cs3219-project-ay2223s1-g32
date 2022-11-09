const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const History = require('../model/history-model')

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const getAllHistories = async () => { 
  const histories = await History.find({}).sort({ 'user': 1, 'timestamp': -1 })
  return histories
}

const getHistory = async (id) => { 
  const history = await History.findById(id)
  return history
}

const getUserHistory = async (userId) => {
  const history = await History.find({ user: userId }).sort({ 'timestamp': -1 })
  return history
}

const createHistory = async (user, question, content) => {
  const newHistory = await History.create({
    user,
    question,
    content
  })

  return newHistory
}

const deleteHistory = async (id) => {
  await History.findByIdAndDelete(id);
}

const deleteUserHistory = async (userId) => {
  await History.deleteMany({ user: userId });
}

module.exports = { 
  getAllHistories, 
  getHistory, 
  getUserHistory, 
  createHistory,
  deleteHistory,
  deleteUserHistory
}