// require('./init')
const express = require("express")
const session = require("express-session")
const cors = require("cors")
const app = express()
const path = require("path")
const staticRoot = path.resolve(__dirname, "../public")
// 设置模版引擎路径 
app.set("views", path.resolve(__dirname, "./views"));
app.use("/page", require("./controller/student"))
app.use(
  session({
    secret: "test",
    name: "sessionid",
  })
);
// app.use(require("./proxyMidleware"))
app.use(require("./imgProtectMid"))
app.use(express.static(staticRoot, {
  // maxAge: 3600 * 1000
  setHeaders(res, path) {
    if (!path.endsWith(".html")) {
      // 其他文件长久缓存。除了html
      res.header("cache-control", `max-age=${3600 * 1000*24*265*100}`)
    }
  }
}))
// app.use(require("./corsMiddleware"))

// 添加cookie-parser中间件
//加入之后会在req对象中注入cookies属性，用户获取所有传递过来的cookie
const cookieParser = require("cookie-parser")
app.use(cookieParser()) //可以添加密钥

// 应用登录验证中间件
app.use(require("./api/tokenMiddleware"))
// 处理跨域
app.use(cors())

app.use(express.urlencoded({
  extended: true
}))
// 解析multipart/form-data数据

// 解析json数据格式
app.use(express.json())
app.use(require("./api/apiLoggerMidware"))
// 处理api的请求
app.use("/api/student", require("./api/student"))
app.use("/api/login", require("./api/admin"))
app.use("/api/upload", require("./api/upload"))
app.use("/api/download", require("./api/download"))
app.use(require("./errorMiddleware"))


require("./api/student")

const port = 9006
app.listen(port, () => {
  console.log("localhost:" + port)
})
