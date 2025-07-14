const {
  getErr,
  getResult
} = require("../getSendResult")
const {
  verify
} = require("../jwt")
const {
  decrypt
} = require("../../util/crypt")
const {
  pathToRegexp
} = require("path-to-regexp")
// 用于解析token

const needTokenApi = [{
    method: "POST",
    path: "/api/student"
  },
  {
    method: "PUT",
    path: "/api/student/:id"
  },
  {
    method: "GET",
    path: "/api/student"
  },
  {
    method: "GET",
    path: "/api/login/getInfo"
  },
];

function hasLoginWithSession(req, res, next) {
  const loginUser = req.session.loginUser
  if (loginUser) {
    next()
  } else {
    handleNonToken(req, res, next)
  }
}

function hasLoginWithCookie(req, res, next) {
  let token = req.cookies.token
  if (!token) {
    token = req.headers.authorization || ""
  }
  if (!token) {
    // 没有登录
    return handleNonToken(req, res, next)
  }
  if (token) {
    token = decrypt(token)
  }
  next()

}
module.exports = (req, res, next) => {
  const needs = needTokenApi.filter(api => {
    const reg = pathToRegexp(api.path)
    return api.method == req.method && reg.regexp.test(req.path)
  })
  if (needs.length <= 0) {
    return next()
  }
  const isLogin = verify(req, res, next)
  if (isLogin) {
    //认证通过
    req.userId = isLogin.id;
    next();
  } else {
    //认证失败
    handleNonToken(req, res, next);
  }
  // console.log("isLogin:", isLogin)
  // if (!isLogin) {
  //   return handleNonToken(req, res, next)
  // }
  // res.send(getResult(isLogin))

  // hasLoginWithSession(req, res, next)
  // let token = req.cookies.token
  // if (!token) {
  //   token = req.headers.authorization || ""
  // }
  // if (!token) {
  //   // 没有登录
  //   return handleNonToken(req, res, next)
  // }
  // if (token) {
  //   token = decrypt(token)
  // }
  // //   验证token
  // next()
}

function handleNonToken(req, res, next) {
  res.status(403).send(getErr("请先登录", 403))
}
