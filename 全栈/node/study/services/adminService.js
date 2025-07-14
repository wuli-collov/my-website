// 管理员初始化
//判断数据库中是否有管理员，如果没有创建一个
// 添加一个管理员
const md5 = require("md5")
const Admin = require('../models/admin')
exports.addAdmin = async function (adminObj) {
  // 应该判断adminObj的各种属性是否合理，以及账号是否已存在
  adminObj.loginPwd = md5(adminObj.loginPwd)
  console.log(adminObj)
  const ins = await Admin.create(adminObj)
  return ins.toJSON();

}
// 删除一个管理员
exports.deleteAdmin = async function (id) {
  // 方式一
  // 1。得到实例
  //   const ins = await Admin.findByPk(id)
  //   //删除实例
  //   if (ins) {
  //     await ins.destroy()
  //   }
  //   return ins
  // 方式2
  const val = await Admin.destroy({
    where: {
      id
    }
  })
  console.log(val)

}
// 修改管理员
exports.updateAdmin = async function (id, adminObj) {
  // 方式一
  // 1。得到实例
  // const ins = await Admin.findByPk(id)
  // //修改实例
  // if (ins) {
  //     ins.loginId=adminObj.loginId
  //   await ins.save()
  // }
  //   return ins
  // 方式2
  adminObj.loginPwd = md5(adminObj.loginPwd)
  await Admin.update(adminObj, {
    where: {
      id
    }
  })
}
// 登录，
exports.login = async function (loginId, loginPwd) {
  const result = await Admin.findOne({ //查询一个
    where: {
      loginId,
      loginPwd: md5(loginPwd)
    }
  })
  return result ? result.toJSON() : null
}
exports.getAdminById = async function (id) {
  const result = await Admin.findByPk(id)
  return result ? result.toJSON() : null
}
