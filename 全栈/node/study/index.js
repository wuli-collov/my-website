// require("./socket/index")
// require('./init')
// require('./routes/init')
// const ejs = require("ejs")
// const str = `
// 生成的数字是：<%= number%>
// `
// ejs.renderFile("./test.ejs", {
//   number: Math.random()
// }).then(result => {
//   console.log(result)
// })
// const {
//   Jimp
// } = require("jimp")

// const path = require("path")
// // 给一张图片添加水印
// async function mark(waterFile, originFile, targetFile, proportion = 10, marginProprtion = 0.05) {
//   console.log(waterFile)
//   const [water, origin] = await Promise.all([
//     Jimp.read(waterFile),
//     Jimp.read(originFile),
//   ]);
//   //   对水印图片进行缩放
//   const curProportion = origin.bitmap.width / water.bitmap.width
//   water.scale(curProportion / proportion)
//   //   计算位置
//   const right = origin.bitmap.width * marginProprtion
//   const bottom = origin.bitmap.height * marginProprtion
//   const x = origin.bitmap.width - right - water.bitmap.width
//   const y = origin.bitmap.height - bottom - water.bitmap.height
//   //   写入水印
//   origin.composite(water, x, y, {
//     mode: Jimp.BLEND_SOURCE_OVER,
//     opacitySource: 0.3
//   })
//   await origin.write(targetFile)


// }
// async function test() {
//   const originPath = path.resolve(__dirname, "./origin.jpg")
//   const waterPath = path.resolve(__dirname, "./water.jpg")
//   const targetPath = path.resolve(__dirname, "./new.jpg")
//   mark(waterPath, originPath, targetPath)
// }
// test()

const os = require("os")
const path = require("path")
const cpuNumber = os.cpus().length
const {
  Worker
} = require("worker_threads")
const arr = require("./number.json")
const len = Math.ceil(arr.length / cpuNumber)
const newArr = []
let numbers = cpuNumber;

console.time()

for (let i = 0; i < cpuNumber; i++) {
  const data = arr.slice(i * len, (i + 1) * len);
  const worker = new Worker(path.resolve(__dirname, "./worker.js"), {
    workerData: data
  })
  worker.on("message", (result) => {
    // 收到子线程发送的消息时运行的事件
    newArr.push(...result)
    numbers--
    if (numbers === 0) {
      // 所有线程处理结束
      console.log(newArr)
      console.timeEnd()
    }
    worker.terminate(); //退出子线程 
  })
}

// worker.on("exit", () => {
//   // 当子线程退出运行的事件
// })

// worker.postMessage()
// worker.terminate(); //退出子线程 
