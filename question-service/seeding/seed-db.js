const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
let json = require('./questions.json')
let QuestionModel = require('../model/question-model')

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const populateDatabase = async () => {
  try {
    await QuestionModel.deleteMany();
    console.log("Database cleared.")
    await QuestionModel.insertMany(json.questions)
    console.log("Database population success.")
  } catch (error) {
    console.log("Database population failed:\n", error)
  }
}

populateDatabase().then(() => process.exit())