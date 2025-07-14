const MockJs = require('mockjs')
const result = MockJs.mock({
  "datas|500-700": [{
    "id|+1": 1,
    name: "@cname",
    birthDate: "@date",
    "sex|1-2": true,
    "mobile": /1\d{10}/,
    "ClassId|1-16": 1,
  }]
})
const Student = require("../models/Student")
Student.bulkCreate(result.datas) //向数据库创建多条语句
// console.log(result.datas)
