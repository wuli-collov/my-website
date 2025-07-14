const MockJs = require('mockjs')
const result = MockJs.mock({
  "name|3-5": "Abc", //Abc出现3～5次
  "number|+1": 202,
  "number|1-100": 0, //1~100的随机数
  "datas|16": [{
    "id|+1": 1,
    "name": "前端第 @id 期",
    "openDate": "@date"
  }]
})
const Class = require("../models/Class")
Class.bulkCreate(result.datas) //向数据库创建多条语句
console.log(result)
