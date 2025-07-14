const moment = require("moment")
const Student = require("../models/Student");
const validate = require("validate.js")
const {
  pick
} = require("../util/propertyHelper");
const {
  Op
} = require("sequelize");
const Class = require("../models/Class");
require('../models/relation')
// 添加学生
exports.addStudent = async function (obj) {
  obj = pick(obj, "name", "birthday", "sex", "mobile", "ClassId");
  validate.validators.classExits = async function (value) {
    const c = await Class.findByPk(value);
    if (c) {
      return c.ClassId
    }
    return 'is not exist'
  }
  const rule = {
    name: {
      presence: {
        allowEmpty: false
      },
      type: "string",
    },
    birthday: {
      presence: {
        allowEmpty: false
      },
      datetime: {
        dateOnly: true, //只要日期
        earliest: +moment.utc().subtract(100, "y"),
        latest: +moment.utc().subtract(5, "y"),
      }
    },
    sex: {
      presence: true,
      type: "boolean",
    },
    mobile: {
      presence: {
        allowEmpty: false
      },
      format: /1\d{10}/
    },
    ClassId: {
      presence: true,
      numericality: { //只要值是数字就行
        onlyInteger: true, //只是整数
        strict: false,
      },
      classExits: true,
    },
  }
  // 开启异步方法
  // try {

  // } catch (e) {
  //   return e
  // } 
  await validate.async(obj, rule);
  // const result = await validate.validate(obj, rule)
  const ins = await Student.create(obj)
  return ins && ins.toJSON()

}
// 删除学生
exports.deleteStudent = async function (id) {
  return await Student.destroy({
    where: {
      id: id
    }
  })
}
// 修改学生
exports.updateStudent = async function (id, obj) {
  return await Student.update(obj, {
    where: {
      id,
    },
  });
};
// 分页查询学生
exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = "") {
  // const results = await Student.findAll({
  // offset: (page - 1) * limit,
  // limit: +limit
  // })
  // const total = await Student.count()
  // const datas = JSON.parse(JSON.stringify(results))
  // return {
  //   total,
  //   datas
  // } 
  const where = {};
  if (sex !== -1) {
    where.sex = !!sex;
  }
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  const result = await Student.findAndCountAll({
    attributes: ["id", "name", "sex", "birthday", "age"],
    where,
    include: [Class],
    offset: (page - 1) * limit,
    limit: +limit,
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
}
// 获取单个学生
exports.getStudent = async function (id) {
  const result = await Student.findOne({
    where: {
      id: id
    }
  })
  return result.toJSON()
}
