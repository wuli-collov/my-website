const {
  Sequelize
} = require('sequelize');
const {
  sqlLogger
} = require("../logger")
// 创建一个orm实例
const sequelize = new Sequelize('myschooldb', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    sqlLogger.debug(msg)
  }
})

module.exports = sequelize
