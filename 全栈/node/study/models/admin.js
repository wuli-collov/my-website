const {
  DataTypes
} = require('sequelize');
const sequelize = require('./db')
// 返回一个模型对象
const Admin = sequelize.define('Admin', {
  // 在这里定义模型属性
  loginId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  //   freezeTableName: true
  // tableName:''//指定表名字
  // 不要忘记启用时间戳！
  //   timestamps: true,

  // 不想要 createdAt
  //   createdAt: false,

  // 想要 updatedAt 但是希望名称叫做 updateTimestamp
  //   updatedAt: 'updateTimestamp',
  // createdAt: false,
  // updatedAt: false,
  logging: null, //不再记录日志
  paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列，deleteAt
})
// - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// ;
// (async function () {
//   await Admin.sync({
//     alter: true
//   })
//   console.log('同步完成')
// })();
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true })- 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
module.exports = Admin;
