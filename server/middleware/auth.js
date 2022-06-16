const jwt = require('jsonwebtoken')
const User = require('./../model/user')
const config = process.env
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
function l(a){
  console.log(...a)
}
function g(a){
  console.group(a)
}
function eg(a){
  console.groupEnd(a)
}
const verifyToken = async (req, res, next) => {
  g('verifyToken')
  const token = req.headers['authorization']?.split(' ')[1] ||  req.body.token || req.query.token || req.headers['x-access-token']
  l('token is :',[token], 'auth header:',req.headers['authorization']?.split(' ')[1])
  let user = null;
  let decoded = null;
  if (!token) {
    l(['error a token is required'])
    return res.status(403).send('A token is required for authentication')
  }
  try {
    g('try')
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    l(['after verify',decoded])
    user =  await User.findOne({ email:decoded.email })
    l(['find user from db',user])
    if(user.token!==token){
      l(['token is not latest',user.token,token])
      return res.status(401).send('this token has been invalidated')
    }

    if (user.activated===false||decoded.activated===false){
      l(['the user is not activated'])
      return res.status(401).send('not approved or deactivated')
    }else if (user.loggedOut===true||decoded.loggedOut===true){
      l(['logged out is true'],user.loggedOut,decoded.loggedOut)
      return res.status(401).send('You are not logged in')
    }else{
      l(['you are authorized and the user is', user])
      req.user= selectiveUser(user)
    }
    eg()
  } catch (err) {
    g('catch')
    l(['error', err])
    await User.findAndUpdate({email:user.email}, { $set: { token: null } })
    l(['user is updated setting token with null', await User.findOne({ email:decoded.email })  ])
    return res.status(401).send('Invalid Token')
    eg()
  }
  l(['next is returned now'])
  eg()
  return next()
}

module.exports = { auth: verifyToken, jwt}
