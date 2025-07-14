const path = require("path")
const fs = require("fs")
const mine = require("mime")

async function getFileName(urlPath, root) {
  let fileName = path.join(root, urlPath)
  try {
    const stat = await fs.promises.stat(fileName)
    if (stat.isDirectory()) {
      const newUrlPath = path.join(urlPath, "index.html")
      return await getFileName(newUrlPath, root)
    } else {
      return fileName
    }
  } catch (e) {
    console.log("文件不存在")
  }
}
module.exports = function (root) {
  return async function (ctx, next) {
    if (ctx.method !== "GET") {
      next()
    } else {
      const filename = await getFileName(ctx.path, root)
      if (!filename) {
        await next()
        return;
      }
      ctx.body = fs.createReadStream(filename)
      ctx.type = mine.getType(filename)
    }


  }
}
