// const redis = require("redis")

// async function init() {
//   const client = await redis.createClient().on("error", (err) => console.log("Redis Client Error", err)).connect();
//   console.log(client)
//   const status = await client.set("name", "wuli")
//   console.log(status)

// }
// init()
const express = require("express")
const app = express()
app.use(express.static("./public"))
const router = express.Router()
router.get("/:id", require("./cache")({
  ttl: -1
}), (req, res) => {
  res.send({
    title: '新闻标题',
    content: "新闻内容"
  })
})
app.use("/api/news", router)
app.listen(9008, () => {
  console.log("localhost:9008")
})
