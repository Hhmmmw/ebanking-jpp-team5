const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true },
  activated: { type: Boolean, default: true },
  balance: { type: Number, required: true }
}, { timestamps: true })

module.exports = mongoose.model('account', accountSchema)
