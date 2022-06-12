require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs')
const { log } = require('./config/log')
const { auth, jwt } = require('./middleware/auth')
const User = require('./model/user')
const app = express()

app.use(express.json())

// Logic goes here
// importing user context
//
app.post('/register', async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send('All input is required')
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    })

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )
    // save user token
    user.token = token

    // return new user
    res.status(201).json(user)
  } catch (err) {
    log(err)
  }
  // Our register logic ends here
})

// ...
// ...

app.post('/login', async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      )

      // save user token
      user.token = token

      // user
      res.status(200).json(user)
    }
    res.status(400).send('Invalid Credentials')
  } catch (err) {
    log(err)
  }
  // Our register logic ends here
})

// ...

app.get('/', async (req, res) => {
  res.status(200).send('HI 🙌 guest')
})
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 user')
})
module.exports = app
