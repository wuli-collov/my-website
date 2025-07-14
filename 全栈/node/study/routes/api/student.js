//对学生路由操作
const stuSer = require("../../services/studentService")
const {
  asyncHandler
} = require("../getSendResult")
const express = require("express")
const router = express.Router()
router.get("/", asyncHandler(async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const sex = req.query.sex || -1
  const name = req.query.name || ''
  return await stuSer.getStudents(page, limit, sex, name)
}))
router.get("/:id", asyncHandler(async (req, res) => {
  const id = req.params.id || ''
  return await stuSer.getStudent(id)
}))
router.post("/", asyncHandler(async (req, res) => {
  const data = req.body
  return await stuSer.addStudent(data)
}))
router.delete("/:id", asyncHandler(async (req) => {
  return await stuSer.deleteStudent(req.params.id || '')
}))
router.put("/:id", asyncHandler(async (req) => {
  return await stuSer.updateStudent(req.params.id || '', req.body)
}))

module.exports = router
