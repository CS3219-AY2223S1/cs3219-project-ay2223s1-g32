const mongoose = require("mongoose")

var Schema = mongoose.Schema
let HistoryModelSchema = new Schema({
  user: {
      type: String,
      required: true,
  },
  collaborator: {
    type: String,
    required: true,
  },
  question: {
      type: String,
      required: true,
  },
  content: {
    type: String,
  }
}, { timestamps: { createdAt: "timestamp" } })

module.exports = mongoose.model('HistoryModel', HistoryModelSchema)