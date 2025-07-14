const {
  DataTypes
} = require('sequelize');
const sequelize = require('./db')
module.exports = sequelize.define("Book", {
  name: { //名字
    type: DataTypes.STRING,
    allowNull: false
  },
  imgurl: { //图片路径
    type: DataTypes.STRING,
  },
  publishDate: { //发版日期
    type: DataTypes.DATE,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  paranoid: true
})
