const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin:{type:Boolean, default:false},
  loggedOut:{type:Boolean},
  token: {type:String},
  sessions: {type: Number},
  activated: {type: Boolean, default: true},
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)
