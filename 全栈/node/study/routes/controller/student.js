const express = require("express")
const router = express.Router()
router.get("/", async (req, res) => {
  res.render("./studentes.ejs", {
    number: Math.random(),
    datas: [{
      name: "zs"
    }]
  })
})

module.exports = router
