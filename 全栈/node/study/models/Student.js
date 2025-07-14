const sequelize = require("./db");
const moment = require("moment")
const {
  DataTypes
} = require("sequelize");

module.exports = sequelize.define(
  "Student", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        // 访问器。获取成时间戳 
        return this.getDataValue("birthday")?.getTime()
      }
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = moment.utc()
        const birh = moment.utc(this.birthday)
        return now.diff(birh, 'y') //得到两个日期年份的差异
      }
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    }
  }, {
    createdAt: false,
    updatedAt: false,
    paranoid: true,
  }
);
