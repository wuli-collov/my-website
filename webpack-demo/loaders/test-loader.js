module.exports = function (sourceCode) {
  var val = sourceCode.replace(/_/g, "var ")
  val = val.replace(/\$/g, "let ")
  return val

}
