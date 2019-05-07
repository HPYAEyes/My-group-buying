import mongoose from 'mongoose'
const Schema = mongoose.Schema
const OrderSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  productId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'Product'
  },
  saleId: {
    type: mongoose.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)