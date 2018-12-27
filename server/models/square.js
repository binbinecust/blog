const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SquareSchema = new Schema(
  {
    keyWord: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: {} }
)

module.exports = mongoose.model('Square', SquareSchema)
