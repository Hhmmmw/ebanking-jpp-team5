const mongoose = require('mongoose')
// const log = require('./config/log')

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin:{type:Boolean, default:false},
  loggedOut:{type:Boolean},
  token: {
    prev: { type: String },
    curr: { type: String },
  },
  activated: {type: Boolean, default: true},// TODO: make it false after implementation of activate by admin
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)
