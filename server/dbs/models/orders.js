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
  saleName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  expires: {
    type: String,
    required: true
  },
  imgUrl: {
    type: Array,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: { // 0为已评价，1为待使用，2为待评价，3为已过期, 4为已退款
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)