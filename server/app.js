require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs')
const { log } = require('./config/log')
const { auth, jwt } = require('./middleware/auth')
const User = require('./model/user')
const Account = require('./model/account')

const app = express()

const bodyParser = require('body-parser')
const axios = require('axios')
const expiresIn = process.env.EXP_IN
app.use(bodyParser.json());
app.post('/register', async (req, res) => {

  try {
    const { firstName, lastName, email, password } = req.body
    if (!(email && password && firstName && lastName)) {
      return res.status(400).send('All input is required')
    }
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      activated: true,
      loggedOut: true,
    })
    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})
const chkTok = async (tok) => {
  let u;
  try {
    u = jwt.verify(tok, process.env.TOKEN_KEY)
  } catch (err) {
    return false;
  }
  return u;
}
const extTok = async (tok) => {
  const result = await chkTok(tok)
  let user
  if (!!result) {
    user = await User.findOne({ email: result.email })
    return user;
  }
  return false
}
const selectiveUser = (user) => {
  return {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    activated: user.activated,
    loggedOut: user.loggedOut,
    isAdmin: user.isAdmin,
    token: user.token
  }
}
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('body', req.body)
    if (!(email && password)) {
      return res.status(400).send('All input is required')
    }
    let user = await User.findOne({ email })
    let token = null
    if (user) {
      console.log('user is found', user)
      if (user.activated) {
        console.log('user.activated', user.activated)
        if ((await bcrypt.compare(password, user.password))) {
          console.log('user.compare: password match')
          if (user.token !== null) {
            console.log('login session: we have sessions: ', user.token)

            const isValid = await chkTok(user.token)
            console.log('login session: isValid: ', isValid)
            if (isValid === false) {
              console.log('login session: session is not valid [deleting]: ')
              await User.findByIdAndUpdate(user._id, { $set: { token: null } })
            } else if (user.loggedOut === true) {
              await User.findByIdAndUpdate(user._id, { $set: { token: null } })
            }
          }
          if (user.token === null) {
            console.log('login: the new session list is empty')
            await User.findByIdAndUpdate(user._id, { $set: { loggedOut: false } })
            user = await User.findOne({ email })
            console.log('loggedout: ', user.loggedOut)

            token = jwt.sign(
              { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },
              process.env.TOKEN_KEY,
              { expiresIn }
            )

            await User.findByIdAndUpdate(user._id, { $set: { token } })
            user = await User.findOne({ email })
            return res.status(200).json({ userId: user._id, token: user.token })
          } else {
            console.log('the new session list is still not empty: user', user.token)
            const isValid = await chkTok(user.token)
            console.log('the new session list is still not empty: is valid', isValid)
            if (isValid !== false) {
              console.log('responding', user, selectiveUser(user))
              return res.status(200).send(selectiveUser(user))
            }
          }

        } else {
          return res.status(400).send('login: Invalid Credentials')
        }
      } else {
        return res.status(400).send('login: Your user account is suspended or not activated yet!')
      }
    } else {
      return res.status(400).send('login: couldn\'t find credential, please register first')
    }
  } catch (err) {
    console.log('login:', err)
    return res.status(500).send(err)
  }
})
app.post('/logout', auth, async (req, res) => {
  try {
    const { email } = req.user
    console.log('user', req.user)
    let user = await User.findOne({ email })
    if (user) {
      if (user.token !== null) {
        try {
          // req.user.loggedOut = true
          await User.findByIdAndUpdate(user._id, { $set: { loggedOut: true } })
          user = await User.findOne({ email })
          // const token = jwt.sign(
          //   { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },
          //   process.env.TOKEN_KEY,
          //   { expiresIn }
          // )
          // await User.findByIdAndUpdate(user._id, { $set: { token } })
          // user = await User.findOne({ email })
          // user.token = user.token.curr
          return res.status(200).json(selectiveUser(user))
        } catch (_err) {
          return res.status(500).send(`error [${_err}] happened while logging out`)
        }
      } else {
        return res.status(400).send('you cannot logout')
      }

    } else {
      return res.status(400).send('couldn\'t find credential, please register first')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

app.get('/', async (req, res) => {
  res.status(200).send('HI 🙌 guest')
})

app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 user')
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
  res.status(200).send(req.user)
})
app.post('/createAccount', auth, async (req, res) => {
  try {
    const { balance } = req.body
    const { email } = req.user
    if (!(email && balance)) {
      return res.status(400).send('All input is required')
    }
    let user = await User.findOne({ email })

    const account = await Account.create({
      email,
      balance,
    })
    return res.status(201).json(account)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})
app.post('/getUserAccounts', auth, async (req, res) => {
  try {
    // const { balance } = req.body
    const { email } = req.user
    if (!email) {
      return res.status(400).send('All input is required')
    }
    let user = await User.findOne({ email })

    let accounts = await Account.find({ email })

    return res.status(201).json({accounts})
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})
module.exports = app
