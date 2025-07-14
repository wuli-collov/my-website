const path = require("path")
const log4js = require("log4js")

function getCommonAppender(pathSeg) {
  return {
    // 定义一个sql日志出口
    type: 'dateFile', //备份变成日期文件
    filename: path.resolve(__dirname, "logs", pathSeg, "logging.log"),
    maxLogSize: 1024 * 1024, //配置文件最大的字节数
    keepFileExt: true,
    daysToKeep: 1, //保留日志   0=>不限制默认值
    layout: {
      type: 'pattern',
      pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
    }
  }
}
log4js.configure({
  appenders: {
    sql: getCommonAppender("sql"),
    api: getCommonAppender("api"),
    default: {
      type: "stdout" //控制台输出

    }
  },
  categories: {
    sql: {
      appenders: ['sql'], //该分类使用出口sql的配置写入日志
      level: 'all'
    },
    default: {
      appenders: ['default'],
      level: 'all'
    },
    api: {
      appenders: ['api'],
      level: 'all'
    }
  }
})
process.on("exit", () => {
  log4js.shutdown //在意外退出的时候保证记录好日志
})
exports.sqlLogger = log4js.getLogger('sql')
exports.apiLogger = log4js.getLogger('api')
exports.logger = log4js.getLogger()
