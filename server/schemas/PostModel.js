import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    image: {
        type: Buffer,
        default: null
    },
    caption: {
        type: String,
        default: null
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        required: true,
    }
})

export default mongoose.model('Post', schema)