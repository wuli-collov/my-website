const express = require("express")
const router = express.Router()
const admiServer = require("../../services/adminService")
const {
  publish
} = require("../jwt")
const {
  encrypt
} = require("../../util/crypt")
const {
  asyncHandler
} = require("../getSendResult")
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      loginId,
      loginPwd
    } = req.body
    const result = await admiServer.login(loginId, loginPwd)
    if (result) {
      // 登录成功
      // const value = encrypt(result.id.toString())
      console.log("sessiono", req.session)
      // req.session.loginUser = result //通过session登录
      console.log("publish", result)
      publish(res, result)
      // res.cookie("token", value, {
      //   path: "/",
      //   domain: "localhost",
      //   maxAge: 7 * 24 * 3600 * 1000 //毫米数
      // })
      // //   给其他设备的凭证
      // res.header("authorization", value)
      //   res.header("set-cookie", `token=${result.id}; path=/; domain=localhost; max-age=3600`);
    }
    return result
  })
)
router.get("/getInfo",
  asyncHandler(async (req, res) => {
    return await admiServer.getAdminById(req.userId)

  }))
module.exports = router
