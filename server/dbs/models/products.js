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
  area: {
    type: String,
    required: true
  },
  averRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true
  },
  imgUrl: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    maxlength: 100,
    required: true
  },
  tel: {
    type: String,
    maxlength: 13,
    required: true
  },
  officeHours: {
    type: String,
    required: true
  },
  hot: {
    type: Boolean,
    default: false,
    required: true
  },
  commentCount: {
    type: Number,
    default: 0,
    required: true
  },
  saleList: [
    {
      name: {
        type: String,
        required: true
      },
      salePrice: {
        type: Number,
        required: true
      },
      offPrice: {
        type: Number,
        required: true
      },
    }
  ],
  lng: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema)