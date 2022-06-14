const mongoose = require('mongoose')
// const log = require('./config/log')

const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  // sessionCount: { type: Number, default: 0 },
  sessionToken:{type:String,required:true}
}, { timestamps: true })

module.exports = mongoose.model('session', sessionSchema)
