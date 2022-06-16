const jwt = require('jsonwebtoken')
// const log = require('./config/log')
const User = require('./../model/user')
// const {expiresIn}= require('./../app')
const Session = require('./../model/session')

const config = process.env

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] ||  req.body.token || req.query.token || req.headers['x-access-token']

  console.log(req.headers['authorization']?.split(' ')[1])
  let user = null;
  let decoded = null;
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY)

    user =  await User.findOne({ email:decoded.email })

    if(user.token.curr!==token){
      return res.status(401).send('this token has been invalidated')
    }

    if (user.activated===false){
      // console.log(decoded)
      return res.status(401).send('not approved or deactivated')
    }else if (user.loggedOut===true){
      // req.email=decoded.email
      return res.status(401).send('You are not logged in')
    }else{
      req.user ={
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        activated: user.activated,
        loggedOut: user.loggedOut,
        isAdmin: user.isAdmin,
        token: user.token.curr
      }// decoded
    }
  } catch (err) {
    // TODO: Solution one of token expiration
    // delete session from here
    // user = await User.findOne({ user.email })
    // await Session.findOneAndDelete({ sessionToken: token })
    // try{
    await Session.findOneAndDelete({sessionToken: token }).then((docs)=>{console.log(!!docs?`Deleted Session : ${docs}`:'session is not found')}).catch((err)=>{console.log(err,'session already deleted')})
    // }catch(err){
      // console.log('session already deleted')
    // }


    // if (session.length>0) {
      /// console.log(session[0].createdAt.getTime());
      // if (Date.now() - session.createdAt.getTime() >= config.EXP_IN) {
        // await Session.findByIdAndRemove(session._id)
      // }
    // }
// }
    return res.status(401).send('Invalid Token')
  }
  return next()
}

// const verifyTokenAdmin = async (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers['x-access-token']

//   if (!token) {
//     return res.status(403).send('A token is required for authentication')
//   }
//   try {
//     const decoded = jwt.verify(token, config.ADMIN_TOK_KEY)

//     const user =  await User.findOne({ email:decoded.email })
//     if(!user.isAdmin){
//       return res.status(401).send('You are not admin')
//     }
//     if(user.token.curr!==token){
//       return res.status(401).send('this token has been invalidated')
//     }

//     if (decoded.activated===false){
//       console.log(decoded)
//       return res.status(401).send('not approved or deactivated')
//     }else if (decoded.loggedOut===true){
//       // req.email=decoded.email
//       return res.status(401).send('You are not logged in')
//     }else{
//       req.user = user //decoded
//     }
//   } catch (err) {
//     // TODO: Solution one of token expiration
//     // delete session from here
//     return res.status(401).send('Invalid Token')
//   }
//   return next()
// }

module.exports = { auth: verifyToken, jwt}
  // ,authAdmin:verifyTokenAdmin }
