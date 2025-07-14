const validate = require("validate.js")
const moment = require("moment")
// 或者验证器
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  /**
   * 该函数会自动用于日期格式转换
   * 它会在验证时自动触发，它需要将任何数据转换为时间戳返回
   * 如果无法转换，返回NaN
   * @param {*} value 传入要转换的值
   * @param {*} options 针对某个属性的验证配置
   */
  parse: function (value, options) {
    console.log("value:", value)
    let formats = ["YYYY-MM-DD HH:mm:ss", "YYYY-M-D H:m:s", "x"];
    if (options.dateOnly) {
      formats = ["YYYY-MM-DD", "YYYY-M-D", "x"];
    }
    return +moment.utc(value, formats, true);
  },
  /**
   * 用户显示错误消息时，使用的显示字符串
   */
  format: function (value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});
