module.exports.getErr = function (err = "server internal error", errCode = 500) {
  return {
    code: errCode,
    msg: err ? err instanceof Error ? err.message : err : "",
  }
}
module.exports.getResult = function (result) {
  return {
    code: 0,
    msg: "",
    data: result
  }
}
module.exports.asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next)
      res.send(module.exports.getResult(result))
    } catch (err) {
      next(err)
    }
  }
}
