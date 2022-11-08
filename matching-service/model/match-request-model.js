import mongoose from "mongoose";
var Schema = mongoose.Schema;

let MatchRequestModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  matched: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("MatchRequestModel", MatchRequestModelSchema);
