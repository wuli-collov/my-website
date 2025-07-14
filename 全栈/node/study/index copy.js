// const sequelize = require('./models/admin')
// 测试链接是否成功
// async function test() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// test()

const Admin = require('./models/admin')
const ins = Admin.build({
  loginId: 'abc',
  name: 'admin',
  loginPwd: "123"
}) //同步方法，构建一个模型实例
//异步方法 执行sql语句
ins.save().then(res => {
  console.log("新建管理员成功", res)
})
// 可以直接通过create执行
// Admin.create({
//   loginId: 'abc',
//   name: 'admin',
//   loginPwd: "123"
// }).then(ins=>{

// })
