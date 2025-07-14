const Book = require('../models/Book')
// 添加书籍
exports.addBook = async function (obj) {
  const ins = await Book.create(obj)
  return ins.toJSON()
}
// 删除书籍
exports.deleteBook = async function (id) {
  const ins = await Book.destroy({
    id: id
  })
}
// 修改书籍
exports.updateBook = async function (id, data) {
  const ins = await Book.update(data, {
    id: id
  })
}

exports.findBook = async function () {
  const res = await Book.findAndCountAll({

  })
  return res
}
