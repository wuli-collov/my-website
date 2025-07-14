// 颁发jwt

const jwt = require('jsonwebtoken')
const secret = "f3jf9x9ss7vaygmt"
const cookieKey = "token"
exports.publish = function (res, info = {}, maxAge = 3600 * 1000 * 24) {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge
  })
  //   添加到cookie
  res.cookie(cookieKey, token, {
    maxAge
  })
  //   添加其他
  res.header("authorization", token)
}
exports.verify = function (req, res, next) {
  let token = req.cookies[cookieKey]
  if (!token) {
    token = req.headers.authorization
    if (!token) {
      return null
    }
  }
  try {

    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}
