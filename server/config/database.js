const mongoose = require('mongoose')
// const { log } = require('./config/log')

const { MONGO_URI } = process.env

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => {
      console.log('Successfully connected to database')
    })
    .catch((_error) => {
      console.log('database connection failed. exiting now...')
      console.error(_error)
      // console.exit(1)
    })
}
