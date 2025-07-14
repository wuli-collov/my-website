const Koa = require("koa")
const path = require("path")
const app = new Koa();
const static = require("./koa-static")
app.use(static(path.resolve(__dirname, "../public")))
app.use(require("./koa-fallback"))
app.use(function (ctx, next) {
  ctx.response.body = {
    loginId: "admin",
    name: "admin"
  }
  next()
})
app.use(function (ctx, next) {

})

app.listen(9008, () => {
  console.log("localhost:9008")
})
