// // const sequelize = require('./models/admin')
// const moment = require("moment")
// moment.locale("zh-ch")
// // 得到当前时间
// // console.log(moment().toString())
// // 得到utc时间
// // console.log(moment.utc().toString())
// // 得到当前时间戳
// // console.log( +moment())
// //根据指定的时间格式得到时间
// // const value = "1970-01-01 00:00:00"
// // console.log(moment(value).toString(), +moment(value))
// // console.log(moment.utc(value).toString(), +moment.utc(value))

// // 支持的时间格式
// const formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"]
// // // true启用严格模式
// // console.log(moment.utc("1970-01-01 00:00:00", formats, true))

// const m = moment.utc("2015-1-5 23:00:01")
// m.local().format("YYYY年MM月DD日 HH点:mm分:ss秒")
// console.log(m.local().format("YYYY年MM月DD日 HH点:mm分:ss秒"))
// const m = moment.utc("2025-07-15 13:00:01", formats, false)
// const toLocal = m.local().fromNow()
// console.log(toLocal)
// // const {
// //   deleteAdmin
// // } = require('./services/adminService')

// // deleteAdmin(1).then(res => {

// // })

// // require('./models/relation')
// // require("./mock/mockStudent")

// // require("./spider/fetchBook")
// const md5 = require("md5")
// const {
//   login,
//   addAdmin,
//   getAdminById
// } = require("./services/adminService")
// const {
//   getStudents,
//   getStudent
// } = require("./services/studentService")
// const {
//   findAll
// } = require("./services/classService")
// const {
//   findBook
// } = require("./services/bookService")
// // getBooksHTML()
// // login('test', "456").then(val => {
// //   console.log(val)
// // })
// // getAdminById(1).then(val => {
// //   console.log(val)
// // })
// // getStudents(1, 10).then(r => {
// //   console.log(r.datas[0].Class)
// // })
// // findBook(1).then(res => {
// //   console.log(res)
// // })
// // addAdmin({
// //   loginId: 'test',
// //   loginPwd: 'test'
// // }).then(res => {
// //   console.log(res)
// // })

// // login('test', 'test').then(res => {
// //   console.log(res)
// // })

require("./init")
const {
  clear
} = require("console")
const {
  getStudents
} = require("./services/studentService")
getStudents().then(res => {
  console.log(res)
})
// setTimeout(() => {
//   addStudent({
//     name: "adfd",
//     birthday: "2010-3-5",
//     sex: true,
//     mobile: "15454545444",
//     ClassId: 3,
//     deletedAt: "2010-1-1",
//     a: 3,
//     b: 4,

//   }).then(res => {
//     console.clear()
//     console.log("addStudent:", res)
//   })

// }, 1000)
