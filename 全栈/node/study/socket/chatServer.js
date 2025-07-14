const socketIO = require("socket.io")
let users = []
module.exports = function (server) {
  const io = socketIO(server)
  io.on("connection", (socket) => {
    let curUser = "" //当前用户名
    console.log("connection")
    socket.on("login", (data) => {
      curUser = data
      users.push({
        username: data,
        socket
      })
      socket.emit("login", true)
      // 新用户进来了
      socket.broadcast.emit("userin", data)
    })
    socket.on("disconnect", () => {
      socket.broadcast.emit("userout", curUser)
      users = users.filter(f => f.username !== curUser)
    })
    socket.on("msg", (data) => {
      if (data.to) {
        // 发送给指定的用户
        const user = users.find(f => f.username === data.to)
        user.socket.emit("new msg", {
          from: curUser,
          to: data.to,
          content: data.content
        })
      } else {
        // 发送给所有人
        socket.broadcast.emit("new msg", {
          from: curUser,
          to: '所有人',
          content: data.content
        })
      }
    })
    socket.on("users", () => {
      const arr = users.map((u) => u.username);
      socket.emit("users", arr);
    });
  })
}
