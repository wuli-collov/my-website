// 处理错误的中间件
const {
  getErr
} = require("./getSendResult")
const multer = require('multer')
module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(200).send(getErr(err.message))
    }
    // 发生了错误
    res.status(500).send(getErr(err))
  } else {
    next()
  }
}
