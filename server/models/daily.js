const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DailySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('Daily', DailySchema)
