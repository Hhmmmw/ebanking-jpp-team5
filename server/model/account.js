const mongoose = require('mongoose')
// const log = require('./config/log')

const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  activated: { type: Boolean, default: true },//TODO: make it false after implementation of activate by admin
  balance: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('account', accountSchema)
