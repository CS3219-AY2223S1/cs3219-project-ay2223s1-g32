const mongoose = require("mongoose")

var Schema = mongoose.Schema
let HistoryModelSchema = new Schema({
  user: {
      type: string,
      required: true,
  },
  collaborator: {
    type: string,
    required: true,
  },
  question: {
      type: String,
      required: true,
  },
  content: {
    type: String,
  }
}, { timestamps: { createdAt: timestamp } })

module.exports = mongoose.model('HistoryModel', HistoryModelSchema)