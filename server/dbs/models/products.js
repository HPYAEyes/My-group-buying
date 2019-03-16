import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  place: {
    type: String,
    required: true
  },  
  address: {
    type: String,
    required: true
  },  
  adcode: {
    type: String,
    required: true
  },
  cityCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  comments: [
    {
      userId: {
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
      createTime: {
        type: Date,
        default: Date.now,
        required: true
      },
      updateTime: {
        type: Date,
        default: Date.now,
        required: true
      },
    }
  ],
  averRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 100,
    required: true
  },
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema)