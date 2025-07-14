const express = require("express")
// const socketIO = require("socket.io")
const http = require("http")
const path = require("path")


// express
const app = express()
const server = http.createServer(app)
app.use(express.static(path.resolve(__dirname, "../public")))
require("./chatServer")(server)

// websocket
// const io = socketIO(server)
// io.on("connection", (socket) => {
//   // 当有一个新的客户端链接到服务器成功之后，触发的事件
//   //   监听客户端的msg消息
//   socket.on("msg", chunk => {
//     console.log(chunk.toString("utf-8"))
//   })
//   const timer = setInterval(function () {
//     // 每隔两秒钟，发送一个新消息给客户端
//     socket.emit("test", "")
//   }, 2000)
//   socket.on("disconnect", () => {
//     console.log("disconnect")
//     clearInterval(timer)
//   })
// })



// 监听端口

server.listen(5008, () => {
  console.log("localhost:5008")
})
