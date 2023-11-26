import mongoose, { Schema, mongo } from 'mongoose'

const CommentShema = new Schema({
  post: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

export default mongoose.model('Comment', CommentShema)
