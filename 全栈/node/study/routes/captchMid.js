const express = require("express")

const router = express.Router()
router.get("/captcha", (req, res) => {

})

function vaildateCaptch(req, res, next) {
  const reqCaptcha = req.body.captch && req.body.captch.toLowerCase() || ''
  if (reqCaptcha !== req.session.captcha) {
    res.send({
      code: 401,
      msg: "验证码有问题"
    })
  } else {
    next()
  }
  req.session.captcha = ""
}

function captchaHandler(req, res, next) {
  // 验证是否需要验证码
  if (!req.session.records) {
    // 如果session中没有访问记录
    req.session.records = []
  }
  const now = new Date().getTime()
  req.session.records.push(now) //把这次请求的访问时间记录下来
  //   如果在一小段时间中请求达到了一定的数量，就可能是机器
  const duration = 10000
  const repeat = 3
  req.session.records = req.session.records.filter(time => now - time < duration)
  if (req.session.records.length >= repeat || "captcha" in req.body) {
    // 验证验证码
    vaildateCaptch(req, res, next)
  } else {
    next()
  }

}
router.post("*", captchaHandler)
router.put("*", captchaHandler)
module.exports = router
