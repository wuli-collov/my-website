const Class = require('../models/Class')
// 添加班级
exports.addClass = async function (obj) {
  const ins = await Class.create(obj)
  return ins.toJSON()
}
// 删除班级
exports.deleteClass = async function (id) {
  return await Class.destroy({
    id: id
  })
}
// 修改班级
exports.updateClass = async function (id, data) {
  return await Class.update(data, {
    id: id
  })
}
// 获取所有班级
exports.findAll = async function () {
  const res = await Class.findAndCountAll({
    attributes: ['id', 'name', 'openDate']
  })
  return {
    total: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}
