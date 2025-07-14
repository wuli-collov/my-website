const socket = io.connect()
// 客户端发送消息给客户
page.onLogin = function (userName) {
  socket.emit('login', userName)
  socket.on('login', status => {
    if (status) {
      socket.emit("users", "");
      page.intoChatRoom()
    }
  })
  socket.on("users", (users) => {
    page.initChatRoom()
    for (const u of users) {
      page.addUser(u)
    }
  })
  socket.on("userin", (u) => {
    page.addUser(u)
  })
  socket.on("userout", (u) => {
    page.removeUser(u)
  })
  page.onSendMsg = function (me, msg, to) {
    socket.emit("msg", {
      to,
      content: msg,
    });
    page.addMsg(me, msg, to);
    page.clearInput();
  };
  socket.on("new msg", ({
    from,
    to,
    content
  }) => {
    page.addMsg(from, content, to)

  })
}
