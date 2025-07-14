const {
  apiLogger
} = require("../../logger")
const log4js = require("log4js")
// module.exports = (req, res, next) => {
//   apiLogger.debug(`${req.method} ${req.path} ${req.ip}`)
//   next()
// }
module.exports = log4js.connectLogger(apiLogger, {
  level: "auto"
})
