const path = require("path");
const url = require("url")
module.exports = (req, res, next) => {
  // 只处理图片
  const extname = path.extname(req.path)
  if (![".jpg", ".jpeg", ".png", ".gif"].includes(extname)) {
    next()
    return
  }
  const host = req.headers.host;
  let referer = req.headers.referer;
  if (referer) {
    referer = url.parse(referer).host
  }
  if (referer && host !== referer) {
    // res.status(404).end()
    req.url = "/upload/logo.jpg"
  }
  next()
}
