https://koajs.github.net.cn/

和express对比
koa没有内置中间件
没有路由处理
只有app.use

更合理的对象结构

app.use(async function(ctx,next){
    <!-- 比express多一个contenxt上下午 -->
    ctx.req
    ctx.res
    ctx.user
    next()
})

支持异步中间件

context
 req:http模块内置的对象
 res：http模块内置对象
 request：koa封装的请求对象，用于获取请求传递的信息
 response：koa封装的响应对象，用户设置响应信息
方式一
```js
const Koa = require("koa")
const http = require("http")
const https = require("https")
const app = new Koa();
const server = http.createServer(app.callback())
const server2 = https.createServer(app.callback())
server.listen(9527, () => {
  console.log("server listening")
})
```
方式二
```js
const Koa = require("koa")
const app = new Koa();

app.use(function (ctx, next) {
  console.log("mid1")
  next()
})
app.use(function (ctx, next) {
  console.log("mid2")
})

app.listen(9527, () => {
  console.log("localhost:9527")
})
app.on("error",function(err){
  console.log(err)
})

```
ctx.app
ctx.state
ctx.body
ctx.cookies.set(name,value[,options])
ctx.cookies.get(name)
ctx.throw(403,"you have no permission")
ctx.cookies.set(name,value,{signed:true})
ctx.cookies.get(name,{signed:true})

app.on//获取事件
app.emit//注册事件

## 常用中间件
|                          Koa中间件                           |                             功能                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|        [@koa/router](https://github.com/koajs/router)        | 官方中间件。借鉴了`koa-router`<br />用于处理路由的中间件，用法类似 `express.Router` |
|    [koa-bodyparser](https://github.com/koajs/bodyparser)     | 解析请求体的中间件，支持<br />x-www-form-urlencoded, application/json格式的请求体 |
|      [koa-views](https://github.com/queckezz/koa-views)      |        渲染模板引擎的中间件，一般用于传统的服务端渲染        |
|        [koa-static](https://github.com/koajs/static)         |                用于搭建静态资源服务器的中间件                |
|  [koa-static-cache](https://github.com/koajs/static-cache)   |                实现了http缓存的静态资源中间件                |
|       [koa-session](https://github.com/koajs/session)        |                        session中间件                         |
|           [koa-jwt](https://github.com/koajs/jwt)            |                       支持jwt的中间件                        |
|      [koa-compress](https://github.com/koajs/compress)       |                   支持gzip动态压缩的中间件                   |
|        [koa-logger](https://github.com/koajs/logger)         |                        日志记录中间件                        |
|          [@koa/cors](https://github.com/koajs/cors)          |               官方中间件。支持CORS跨域的中间件               |
|        [@koa/multer](https://github.com/koajs/multer)        | 官方中间件，借鉴了`koa-multer`<br />用户处理文件上传的中间件 |
| [koa-connect](https://github.com/vkurchatkin/koa-connect#readme) |           将express或connect中间件转换为koa中间件            |
| [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) |                          代理中间件                          |
| [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback#readme) |                         单页应用支持                         |
|  [koa-convert](https://github.com/gyson/koa-convert#readme)  |           用于将旧版本的koa中间件转换为koa2中间件            |




```js
const c2k= require("koa-connect")
//把这个中间件createProxyMiddleware转成koa可以处理的中间件
app.use(c2k(createProxyMiddleware("/api",{
  
})))
```