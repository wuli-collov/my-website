module.exports = (req, res, next) => {
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    let result = ""
    req.on("data", _chunk => {
      result += _chunk.toString("utf-8")
    })
    req.on("end", () => {
      console.log(result)
    })
  } else {

  }
}
