const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const Question = require('../model/question-model')

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const getAllQuestions = async () => { 
  const questions = await Question.find({})
  return questions
}

const getQuestion = async (id) => { 
  const question = await Question.findById(id)
  return question
}

const getRandomQuestion = async (prevId, difficulty, topic) => { 
  let conditions = {}

  if (prevId) {
    conditions["_id"] = { "$ne": prevId }
  }

  if (difficulty) {
    conditions["difficulty"] = difficulty
  }

  if (topic) {
    conditions["topics"] = topic
  }
  
  const question = await Question.findOne(conditions).exec()
  return question
}

module.exports = { getAllQuestions, getQuestion, getRandomQuestion }