require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs')
const { log } = require('./config/log')
const { auth, jwt, authAdmin } = require('./middleware/auth')
const User = require('./model/user')
const Session = require('./model/session')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

// const _ = require('underscore');
// const path = require('path');

const expiresIn = process.env.EXP_IN

// app.use(express.json())
app.use(bodyParser.json());

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
      return res.status(400).send('All input is required')
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')//orriginal return
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // Create user in our database

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      activated: true,
      loggedOut: true,
    })


    // Create token

    // const token = jwt.sign(
    // { user_id: user._id, email },
    // process.env.TOKEN_KEY,
    // {
    // expiresIn,
    // }
    // )
    // save user token
    // user.token = token

    // return new user
    // return res.status(201).json(user)
    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

const invalidateRequesterToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization']?.split(' ')[1]
  let user = null;
  let decoded = null;
  if (!token) {
    // return res.status(403).send('A token is required for authentication')
    return next()
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)

    user = await User.findOne({ email: decoded.email })

    req.user = decoded
    return true
    // }
  } catch (err) {
    // TODO: Solution one of token expiration
    // delete session from here
    // user = await User.findOne({ user.email })
    // await Session.findOneAndDelete({ sessionToken: token })
    try {
      await Session.findOneAndDelete({ sessionToken: token }, (err, docs) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Deleted Session : ", docs);
        }
      })
    } catch (err) {
      console.log('session already deleted')
    }


    // if (session.length>0) {
    /// console.log(session[0].createdAt.getTime());
    // if (Date.now() - session.createdAt.getTime() >= config.EXP_IN) {
    // await Session.findByIdAndRemove(session._id)
    // }
    // }
    // }
    // return res.status(401).send('Invalid Token')
    return next()
  }
  // return next()
  // return res.status(401).send('you are already logged in')

}
// ...
app.post('/login', async (req, res) => {
  await invalidateRequesterToken(req, res, async () => {


    // await auth(req,res)
    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body

      console.log('body', req.body)
      // Validate user input
      if (!(email && password)) {
        return res.status(400).send('All input is required')
      }
      // Validate if user exist in our database
      let user = await User.findOne({ email })
      let session = await Session.find({ email })
      let token = null

      if (user) {
        if (user.activated) {
          if ((await bcrypt.compare(password, user.password))) {
            console.log(session)
            if (session.length > 1) {
              console.log(session[0].createdAt.getTime());
              if ((Date.now() - session[0].createdAt.getTime() > expiresIn)) {
                await Session.findByIdAndRemove(session[0]._id)
                session.pop();
              }

            }
            // console.log(session)
            if (session.length === 0) {
              // Create token

              await User.findByIdAndUpdate(user._id, { $set: { loggedOut: false } })
              user = await User.findOne({ email })
              console.log(user.loggedOut)
              if (user.isAdmin === true) {
                token = jwt.sign(
                  { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut, isAdmin: user.isAdmin },//, sessionId: session._id, token: user.token.curr
                  process.env.ADMIN_TOK_KEY,
                  { expiresIn }
                )
              } else {
                token = jwt.sign(
                  { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },//, sessionId: session._id, token: user.token.curr
                  process.env.TOKEN_KEY,
                  { expiresIn }
                )
              }
              session = await Session.create({
                email,
                sessionToken: token
              })

              // save user token
              // user.token = token
              await User.findByIdAndUpdate(user._id, { $set: { token: { prev: user.token.curr, curr: token } } })

              user = await User.findOne({ email })
              // user.token = user.token.curr
              return res.status(200).json({ userId: user._id, token: user.token.curr })
            } else {
              return res.status(400).send('no multi-sessions')
            }
          } else {
            return res.status(400).send('Invalid Credentials')
          }
        } else {
          return res.status(400).send('Your user account is suspended or not activated yet!')
        }
      } else {
        return res.status(400).send('couldn\'t find credential, please register first')
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  })
})
// ...
app.post('/logout', auth, async (req, res) => {
  try {
    const { email } = req.user

    console.log('user', req.user)

    let user = await User.findOne({ email })
    let session = await Session.find({ email })

    if (user) {
      // if (user.activated) {
      // if ((await bcrypt.compare(password, user.password))) {
      if (session) {
        try {
          req.user.loggedOut = true
          // auth()/
          await Session.findByIdAndRemove(session._id)
          await User.findByIdAndUpdate(user._id, { $set: { loggedOut: true } })
          // await User.findByIdAndUpdate(user._id, { $set: { token } })

          const token = jwt.sign(
            { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },//, sessionId: session._id, token: user.token.curr
            process.env.TOKEN_KEY,
            { expiresIn }
          )

          // save user token
          // user.token = token
          await User.findByIdAndUpdate(user._id, { $set: { token: { prev: user.token.curr, curr: token } } })

          user = await User.findOne({ email })






          user.token = user.token.curr
          return res.status(200).json(user)
        } catch (_err) {
          return res.status(500).send(`error [${_err}] happened while logging out`)
        }
      } else {
        return res.status(400).send('you cannot logout')
      }
      // } else {
      // return res.status(400).send('Invalid Credentials')
      // }
      // } else {
      // return res.status(400).send('Your user account is suspended or not activated yet!')
      // }
    } else {
      return res.status(400).send('couldn\'t find credential, please register first')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})
app.post('/admin/logout', authAdmin, async (req, res) => {
  try {
    const { email } = req.user

    console.log('user', req.user)

    let user = await User.findOne({ email })
    let session = await Session.find({ email })

    if (user) {
      // if (user.activated) {
      // if ((await bcrypt.compare(password, user.password))) {
      if (session) {
        try {
          req.user.loggedOut = true
          // auth()/
          await Session.findByIdAndRemove(session._id)
          await User.findByIdAndUpdate(user._id, { $set: { loggedOut: true } })
          // await User.findByIdAndUpdate(user._id, { $set: { token } })

          const token = jwt.sign(
            { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },//, sessionId: session._id, token: user.token.curr
            process.env.TOKEN_KEY,
            { expiresIn }
          )

          // save user token
          // user.token = token
          await User.findByIdAndUpdate(user._id, { $set: { token: { prev: user.token.curr, curr: token } } })

          user = await User.findOne({ email })






          user.token = user.token.curr
          return res.status(200).json(user)
        } catch (_err) {
          return res.status(500).send(`error [${_err}] happened while logging out`)
        }
      } else {
        return res.status(400).send('you cannot logout')
      }
      // } else {
      // return res.status(400).send('Invalid Credentials')
      // }
      // } else {
      // return res.status(400).send('Your user account is suspended or not activated yet!')
      // }
    } else {
      return res.status(400).send('couldn\'t find credential, please register first')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

// ...
app.get('/', async (req, res) => {
  res.status(200).send('HI 🙌 guest')
})

// ...
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 user')
})
app.post('/admin/welcome', authAdmin, (req, res) => {
  res.status(200).send('Welcome 🙌 admin')
})
app.get('/mountains', async (req, res) => {
  const url = "  https://api.nuxtjs.dev/mountains"
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send(await getData(url))
})



const getData = async (url) => {
  try {
    const response = await axios.get(url, { headers: { "Access-Control-Allow-Origin": "*" } })
    const data = response.data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

app.post('/authed', auth, (req, res) => {
  res.status(200).send()
})
module.exports = app
