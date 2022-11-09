import mongoose from 'mongoose';

var Schema = mongoose.Schema
let BlacklistedTokenModelSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.ObjectId,
        required: true,
    }
})

export default mongoose.model('BlacklistedTokenModelSchema', BlacklistedTokenModelSchema)
