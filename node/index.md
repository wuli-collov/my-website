process.cwd()获取当前命令的所在项目路径
process.exit();退出命令
process.argv;命令行数据
process.platform ；系统平台
process.kill(10428)；杀死进程

os.tmpdir()获取系统的临时目录

__dirname获取当前文件所在的绝对路径
__filename获取当前文件所在的绝对路径加文件名

const basename = path.basename("/d/d//sd.html", ".html")
console.log(basename)=》sd ，可以去除后缀名
path.sep ，可以获取不同系统所用的文件分割符 /
path.delimiter 获取环境分割符：
console.log(process.env.PATH.split(path.delimiter))
path.dirname("a/bc/d")获取一段字符串中的路径名a/bc
path.extname("a/bc/d.a") 获取后缀名
path.join("a/b", "../", "d.js")拼接路径
path.relative("a/b", "../", "d.js")获取相对路径../../..
path.resolve(__dirname, "./a.js")获取绝对路径

const URL = require("url")
const url = URL.parse("https://nodejs.org:80/a/b/c?t=3&u=5#abc")//解析成URL对象 
const url = URL.format(obj);//URL对象 解析成URL链接


const delay=util.promisify(delayCallback)//util.promisify函数把回调函数转成异步函数
util.callbackify把异步函数转成回调函数
 const util = require("util")
 async function delay(duration = 1000) {
   return new Promise(() => {

     setTimeout(() => resolve(duration), duration)
   })
 }
 const delayCallback = util.callbackify(delay)
 delayCallback(5000, () => {

 })

 const stat = await fs.promises.stat(filename);获取文件状态
   console.log("是否是目录", stat.isDirectory());
  console.log("是否是文件", stat.isFile());

fs.promises.readdir(this.filename)读取当前文件夹下的子目录
fs.promises.mkdir("文件夹")//创建文件夹
fs.promises.readFile()//读文件
fs.promises.writeFile()//写文件