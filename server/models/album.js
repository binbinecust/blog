const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: {} }
)

module.exports = mongoose.model('Album', AlbumSchema)
