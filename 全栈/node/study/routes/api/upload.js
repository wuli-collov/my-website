const express = require("express")
const multer = require('multer')
const {
  Jimp
} = require("jimp")
const {
  getResult
} = require("../getSendResult")
const path = require("path")
// const upload = multer({
//   dest: path.resolve(__dirname, "../../public/upload")
// })
function fileFilter(req, file, cb) {
  const whiteList = [".jpg", ".jpeg"]
  const extname = path.extname(file.originalname)
  if (whiteList.includes(extname)) {
    cb(null, true)
  } else {
    cb(new Error(`your ext name of ${extname} not supported`))
  }
  //   // 这个函数应该调用 `cb` 用boolean值来
  //   // 指示是否应接受该文件

  //   // 拒绝这个文件，使用`false`，像这样:
  //   cb(null, false)

  //   // 接受这个文件，使用`true`，像这样:
  //   cb(null, true)

  //   // 如果有问题，你可以总是这样发送一个错误:
  //   cb(new Error('I don\'t have a clue!'))

}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/upload"))
  },
  filename: function (req, file, cb) {
    const timeStamp = Date.now()
    const random = Math.random().toString(36).slice(-6)
    const extname = path.extname(file.originalname)
    cb(null, timeStamp + random + extname)
    // cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
})
// 给一张图片添加水印
async function mark(waterFile, originFile, targetFile, proportion = 10, marginProprtion = 0.05) {
  console.log(waterFile)
  const [water, origin] = await Promise.all([
    Jimp.read(waterFile),
    Jimp.read(originFile),
  ]);
  //   对水印图片进行缩放
  const curProportion = origin.bitmap.width / water.bitmap.width
  water.scale(curProportion / proportion)
  //   计算位置
  const right = origin.bitmap.width * marginProprtion
  const bottom = origin.bitmap.height * marginProprtion
  const x = origin.bitmap.width - right - water.bitmap.width
  const y = origin.bitmap.height - bottom - water.bitmap.height
  //   写入水印
  origin.composite(water, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.3
  })
  await origin.write(targetFile)


}
const router = express.Router()
router.post("/", upload.single("img"), async (req, res) => {
  const waterPath = path.resolve(__dirname, "../../water.jpg")
  const newPath = path.resolve(__dirname, "../../public/upload", req.file.filename)
  await mark(waterPath, req.file.path, newPath)
  res.send(getResult("/upload/" + req.file.filename))
})
module.exports = router
