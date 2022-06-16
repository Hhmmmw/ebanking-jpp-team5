require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs')
const { log } = require('./config/log')
const { auth, jwt } = require('./middleware/auth')
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
    token: user.token.curr
  }
}

const verifyToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.query.token || req.headers['x-access-token']
  let user = null;
  let decoded = null;
  if (!token) {
    return false
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)

    user = await User.findOne({ email: decoded.email })

    if (user.token.curr !== token) {
      return false
    }

    if (decoded.activated === false) {
      return false
    } else if (decoded.loggedOut === true) {
      return false
    } else {
      // req.user =
      // return {
      //   _id: user._id,
      //   email: user.email,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   activated: user.activated,
      //   loggedOut: user.loggedOut,
      //   isAdmin: user.isAdmin,
      //   token: user.token.curr
      // }
      return selectiveUser(user)
    }
  } catch (err) {
    await Session.findOneAndDelete({ sessionToken: token }).then((docs) => { console.log(!!docs ? `Deleted Session : ${docs}` : 'session is not found') }).catch((err) => { console.log(err, 'session already deleted') })
    return res.status(401).send('Invalid Token')
  }
  return next()
}
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

    // if(user.token.curr!==token){
    // return res.status(401).send('this token has been invalidated')
    // return next()
    // }

    // if (decoded.activated===false){
    // console.log(decoded)
    // return res.status(401).send('not approved or deactivated')
    // return next()
    // }else if (decoded.loggedOut===true){
    // req.email=decoded.email
    // return res.status(401).send('You are not logged in')
    // return next()
    // }else{
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
  // await invalidateRequesterToken(req,res, async ()=>{


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
      console.log('user is found', user)
      if (user.activated) {
        console.log('user.activated', user.activated)
        if ((await bcrypt.compare(password, user.password))) {
          console.log('user.compare: password match')
          console.log('login', session)

          if (session.length > 0) {
            console.log('login session: we have sessions: ', session.length)

            for (let i = 0; i < session.length; i++) {
              const ses = session[i]
              console.log('login session: we are handling sessio: ', session)
              const isValid = await chkTok(ses.sessionToken)
              console.log('login session: isValid: ', isValid)
              if (isValid === false) {
                console.log('login session: session is not valid [deleting]: ')
                // await Session.findByIdAndRemove(ses._id)
                await Session.findOneAndDelete({ sessionToken: session.token }).then((docs) => { console.log(!!docs ? `login: findOneAndDelete: Deleted Session : ${docs}` : 'login: findOneAndDelete: session is not found') }).catch((err) => { console.log(err, 'login: findOneAndDelete: session already deleted') })
              }else if(user.loggedOut===true){
                await Session.findOneAndDelete({ sessionToken: session.token }).then((docs) => { console.log(!!docs ? `login: findOneAndDelete: Deleted Session : ${docs}` : 'login: findOneAndDelete: session is not found') }).catch((err) => { console.log(err, 'login: findOneAndDelete: session already deleted') })
                await User.findByIdAndUpdate(user._id, { $set: { token:{curr: null }} })

              }
            }

            // console.log(session[0].createdAt.getTime());
            // if ((Date.now() - session[0].createdAt.getTime() > expiresIn)) {

            // await Session.findByIdAndRemove(session[0]._id)
            // session.pop();
          }


          // console.log(session)
          session = await Session.find({ email })
          console.log('the new session list ', session)
          if (session.length === 0) {
            // Create token
            console.log('login: the new session list is empty')
            await User.findByIdAndUpdate(user._id, { $set: { loggedOut: false } })
            user = await User.findOne({ email })
            console.log(user.loggedOut)
            // if (user.isAdmin === true) {
            //   token = jwt.sign(
            //     { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut, isAdmin: user.isAdmin },//, sessionId: session._id, token: user.token.curr
            //     process.env.ADMIN_TOK_KEY,
            //     { expiresIn }
            //   )
            // } else {
              token = jwt.sign(
                { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },//, sessionId: session._id, token: user.token.curr
                process.env.TOKEN_KEY,
                { expiresIn }
              )
            // }
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
            // return res.status(400).send('no multi-sessions')
            console.log('the new session list is still not empty', session)
            console.log('the new session list is still not empty: user', user.token.curr)
            const isValid = await chkTok(user.token.curr)
            console.log('the new session list is still not empty: is valid', isValid)
            if (isValid !== false) {
              console.log('responding', user , selectiveUser(user))
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
// })
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
// app.post('/admin/logout',authAdmin, async (req, res) => {
//   try {
//     const { email } = req.user

//     console.log('user', req.user)

//     let user = await User.findOne({ email })
//     let session = await Session.find({ email })

//     if (user) {
//       // if (user.activated) {
//       // if ((await bcrypt.compare(password, user.password))) {
//       if (session) {
//         try {
//           req.user.loggedOut = true
//           // auth()/
//           await Session.findByIdAndRemove(session._id)
//           await User.findByIdAndUpdate(user._id, { $set: { loggedOut: true } })
//           // await User.findByIdAndUpdate(user._id, { $set: { token } })

//           const token = jwt.sign(
//             { user_id: user._id, email, activated: user.activated, loggedOut: user.loggedOut },//, sessionId: session._id, token: user.token.curr
//             process.env.TOKEN_KEY,
//             { expiresIn }
//           )

//           // save user token
//           // user.token = token
//           await User.findByIdAndUpdate(user._id, { $set: { token: { prev: user.token.curr, curr: token } } })

//           user = await User.findOne({ email })






//           user.token = user.token.curr
//           return res.status(200).json(user)
//         } catch (_err) {
//           return res.status(500).send(`error [${_err}] happened while logging out`)
//         }
//       } else {
//         return res.status(400).send('you cannot logout')
//       }
//       // } else {
//       // return res.status(400).send('Invalid Credentials')
//       // }
//       // } else {
//       // return res.status(400).send('Your user account is suspended or not activated yet!')
//       // }
//     } else {
//       return res.status(400).send('couldn\'t find credential, please register first')
//     }
//   } catch (err) {
//     console.log(err)
//     return res.status(500).send(err)
//   }
// })

// ...
app.get('/', async (req, res) => {
  res.status(200).send('HI 🙌 guest')
})

// ...
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 user')
})
// app.post('/admin/welcome', authAdmin, (req, res) => {
//   res.status(200).send('Welcome 🙌 admin')
// })
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
// ...
module.exports = app
