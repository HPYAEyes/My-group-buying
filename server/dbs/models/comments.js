import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.ObjectId,
    required: true
  },
  rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true
  },
  content: {
    type: String,
    minlength: 15,
    maxlength: 200,
    required: true
  },
}, { timestamps: true })

export default mongoose.model('Comment', CommentSchema)