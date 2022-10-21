const mongoose = require("mongoose")

var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
      type: String,
      required: true
    },
    difficulty: {
        type: Number,
        required: true,
    },
    topics: {
      type: [String],
    }
})

module.exports = mongoose.model('QuestionModel', QuestionModelSchema)
