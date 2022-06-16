const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  SrcUserId: { type: String, required: true },
  DestUserId: { type: String, required: true },
  ammount: { type: Number, required: true },
  transactionTime: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('transaction', transactionSchema)
