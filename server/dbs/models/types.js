import mongoose from 'mongoose'
const Schema = mongoose.Schema
const TypeSchema = new Schema({
  name: {
    type: String,
    require: true
  },
})

export default mongoose.model('Type', TypeSchema)