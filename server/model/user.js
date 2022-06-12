const mongoose = require('mongoose')
// const log = require('./config/log')

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  activated: {type: Boolean, default: false},
  sessionCount: {type: Number, default: 0}
})

module.exports = mongoose.model('user', userSchema)
