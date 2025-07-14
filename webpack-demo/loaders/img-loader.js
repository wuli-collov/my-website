var utils = require("loader-utils")

function loader(sourceCode) {
  //   const base64 = getBase64(sourceCode)
  console.log("img-loader", sourceCode.byteLength)
  const fileName = getFilePath.call(this, sourceCode)
  return `module.exports=\`${fileName}\``
}

function getBase64(buffer) {
  return `data:image/jpg;base64,` + buffer.toString("base64")
}

function getFilePath(buffer) {
  var filename = utils.interpolateName(this, "[contenthash:5].[ext]", {
    content: buffer
  })
  this.emitFile(filename, buffer)
  return filename
}
module.exports = loader
loader.raw = true
