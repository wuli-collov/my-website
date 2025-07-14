const express = require("express")
const path = require("path")
const router = express.Router()
router.get("/:filename", (req, res) => {
  const absPath = path.resolve(__dirname, "../../resources", req.params.filename)
  //   文件路径 文件名字
  res.download(absPath, req.params.filename)
})
// 迅雷下载协议
// AA地址ZZ
// base64编码
// thunder://base64编码 
/**
 * 
 * <a resrole="thunder" href="/api/download/1752682458893pq9m8b.jpeg">download</a>
 * const a = documnet.querySelectior("a[resrole="thunder"]")
 * let thunderLink=`AAb${a.href}ZZ`
 * thunderLink=bto(thunderLink)
 * thunderLink="thunder://"+thunderLink
 * a.href=thunderLink
 * 
 */
// 上传附加shuiyin
// 用户上传原始图片-》服务器：保留原始图片以及水印图片
// 动态shuiyin
// 用户上传原始图片=》服务器：只保留原始图片
//请求图片时，服务器动态添加水印
// Jimp
module.exports = router
