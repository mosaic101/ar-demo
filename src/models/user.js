const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  status: { type: Number, default: 1 }, // -1: 失效 1: 正常
  nickName: String,
  avatarUrl: String,
  email: String,
  phoneNO: String,
  password: String
}, {
  timestamps: true
})

UserSchema.index({ nickName: 1 })
UserSchema.index({ email: 1 }, { unique: true }) // schema level

module.exports = mongoose.model('User', UserSchema)
