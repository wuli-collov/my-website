[中文网站](https://www.expressjs.com.cn/)
[官网](https://expressjs.com/)
第三方库有：
    express
    koa2
const express = require("express")
const app = express() //创建一个express应用，实际就是一个用于处理请求的函数 

app.get("/", (req, res) => {
  req和res是被express封装过的对象
   // console.log(req, res)
  // console.log("请求头",req.headers)
  console.log("请求路径", req.path)
  console.log("请求参数", req.query)
  // res.send('hello')
  // 设置相应头
  // res.setHeader('a', "123")
  //临时重定向
  // res.status(302).header("location", "https://www.baidu.com").end()
  res.status(302).location("https://www.baidu.com").end()
  res.redirect(302,"https://www.baidu.com")
})


const port = 9007
app.listen(port, () => {
  console.log("localhost:" + port)
})

app.all()//匹配所有
app.get("*")//匹配所有get请求
app.get("*",(req, res) => { //匹配所有get请求
})

RESET 风格的API接口
/api/student post 添加学生
/api/student/:id get 获取学生
/api/student put 修改学生
/api/student delete 删除学生


nodemon监听文件变化
pnpm i -D nodemon
npx nodemon index.js


## 中间件
如果后续已经没有了中间件
express 发现如果响应没有结束
express会响应404
如果中间件发生了错误，不会停止服务器相当于调用了next(错误对象)
寻找后续处理错误的中间件


app.get("/news", (req, res, next) => {
  console.log("handler1")
  <!-- 报错 -->
  throw new Error("abc")=> next(new Error("abc"))
})
app.get("/news", (req, res, next) => {
  console.log("handler2")
  res.send("news 11")
  res.end()
  next()
})
app.get("/news", (req, res, next) => {
  console.log("handler3")
  next()
})

app.get("/news", (req, res, next) => {
  console.log("handler2")
  // res.send("news 11")
  // res.end()
  next(new Error("abc"))
}, (err, req, res, next) => {
  console.log(err)
  res.send("服务器发生了错误")
  next()
})


// 错误处理
app.use("/news", require("./routes/errorMiddleware"))
app.use(require("./routes/errorMiddleware"))
## 常用中间件
### express.static()
当请求时，会根据请求路径，从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，
而不再移交给后续的中间件，如果不存在文件，则直接交给后续的中间件处理
默认情况下，如果映射的结果是一个目录，则会自动使用index.html
可以配置
const path = require("path")
const staticRoot = path.resolve(__dirname, "../public")
app.use(express.static(staticRoot))
app.use("/static",express.static(staticRoot))//以static开头
app.use(express.static(staticRoot,{
  index:"index.html"
}))

app.use("/static",(req,res)=>{
  <!-- 根据基路径来的 -->
    console.log(req.baseUrl,req.path)
})

### express.json()
<!-- 获取Content-Type application/x-www-form-urlencoded -->
app.use(express.urlencoded({
  extended: true
}))
<!-- 相当于这样 -->
module.exports = (req, res, next) => {
  if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    let result = ""
    req.on("data", _chunk => {
      result += _chunk.toString("utf-8")
    })
    req.on("end", () => {
      console.log(result)
    })
  } else {

  }
}


// 解析json数据格式
app.use(express.json())


### express路由
const studentRouter = express.Router()
studentRouter.get("/", (req, res) => {
  console.log("获取学生")
})
studentRouter.get("/:id", (req, res) => {
  console.log("获取单个学生")
})
studentRouter.post("/", (req, res) => {
  console.log("添加学生")
})
//对这个基路由处理对应/api/student
app.use("/api/student", studentRouter) 

### cookie
服务器端设置
set-cookie:token=123; path=/; max-age=3600;httponly
key:token
value:123
domain:baidu.com
path:/
expire:当前时间+3600秒
secure:false 任何请求都可以附带这个cookie只要满足其他要求
httponly:true 不允许js获取这个cookie
<!-- 删除cookie -->
cookie:token=; path=/; max-age=1;domain=baidu.com

客户端设置cookie
document.cookie="健=值"

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      loginId,
      loginPwd
    } = req.body
    const result = await admiServer.login(loginId, loginPwd)
    if (result) {
      res.header("set-cookie", `token=${result.id}; path=/; domain=localhost; max-age=3600`);
    }
    return result
  })
)
cookie-parser

const cookieParser = require("cookie-parser")
app.use(cookieParser)

 res.cookie("token", result.id, {
        path: "/",
        domain: "localhost",
        maxAge: 7 * 24 * 3600 * 1000 //毫米数
      })

  path-to-regexp验证路径是否满足    
pnpm i path-to-regexp --save

### 加密
// 使用对称加密算法：aes 128
// 128位的秘钥
const secret = Buffer.from("mm7h3ck87ugk9l4a");
const crypto = require("crypto");

// 准备一个iv，随机向量
const iv = Buffer.from("jxkvxz97409u3m8c");

exports.encrypt = function (str) {
  const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
  let result = cry.update(str, "utf-8", "hex");
  result += cry.final("hex");
  return result;
};

exports.decrypt = function (str) {
  const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
  let result = decry.update(str, "hex", "utf-8");
  result += decry.final("utf-8");
  return result;
};

### 断点调试
node --inpect
node进程会监听9229端口




### 跨域之CORS
const allowOrigins = ["null"]
module.exports = function (req, res, next) {
  console.log(req.headers)
  //   处理预检请求
  if (req.method === "OPTIONS") {
    console.log("处理预检请求")
    res.header("access-control-allow-methods", req.headers["access-control-request-method"])
    res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"])
  }
  res.header("Access-Control-Allow-Credentials", true)
  //   处理简单请求
  if ("origin" in req.headers && allowOrigins.includes(req.headers.origin)) {
    res.header("access-control-allow-origin", req.headers.origin)
  }
  next()

}

npm install cors

const cors = require("cors")
app.use(cors())//直接允许跨域，默认不允许携带cookie

const whiteList=["null"]//白名单
app.use(cors({
  origin(origin,callback){
    if(whiteList.includes(origin)){
      callback(null,origin)
    }else{
      callback(new Error("not allwed"))
    }
  },
  credentials:true//允许携带cookie
}))

### session
session
	cookie
		存储在客户端
		优点
			存储在客户端，不占用服务器资源
		缺点
			只能是字符串格式
			存储量有限
				sessionStorage
				localStorage
			数据容易被获取
			数据容易被篡改
			容易丢失
	session
		存储在服务器端
		优点
			可以是任何格式
			存储量理论上是无限的
			数据难以被获取
			数据难以篡改
			不易丢失
		缺点
			占用服务器资源
  uuid
	universal unique identity


  npm i express-session

const session = require("express-session")
app.use(
  session({
    secret: "yuanjin",
    name: "sessionid",
  })
);
function hasLoginWithSession(req, res, next) {
  const loginUser = req.session.loginUser
  if (loginUser) {
    next()
  } else {
    handleNonToken(req, res, next)
  }
}

function hasLoginWithCookie(req, res, next) {
  let token = req.cookies.token
  if (!token) {
    token = req.headers.authorization || ""
  }
  if (!token) {
    // 没有登录
    return handleNonToken(req, res, next)
  }
  if (token) {
    token = decrypt(token)
  }
  next()

}

### JWT
jsonwebtoken
npm install jsonwebtoken


const jwt = require('jsonwebtoken')
const secret = "f3jf9x9ss7vaygmt"
const token = jwt.sign({
  id: 1,
  name: "wuli"
}, secret, {
  expiresIn: 3600, //秒
})
console.log(token)
console.log(jwt.decode(token))
console.log(jwt.verify(token,secret))//验证解密

try{
jwt.verify(token, secret)
}catch(e){
console.log("jwt 无效")
}

### multer
https://www.npmjs.com/package/multer
npm i multer


# 总结
## 跨域cors
const cors = require("cors")
app.use(cors())

## cookie
const cookieParser = require("cookie-parser")
app.use(cookieParser()) //可以添加密钥

## session
const session = require("express-session")
app.use(
  session({
    secret: "test",//密钥
    name: "sessionid",
  })
);
## jwt
// 颁发jwt
const jwt = require('jsonwebtoken')
const secret = "f3jf9x9ss7vaygmt"
const cookieKey = "token"
exports.publish = function (res, info = {}, maxAge = 3600 * 1000 * 24) {
  const token = jwt.sign(info, secret, {
    expiresIn: maxAge
  })
  //   添加到cookie
  res.cookie(cookieKey, token, {
    maxAge
  })
  //   添加其他
  res.header("authorization", token)
}
<!-- 验证jwt密钥 -->
exports.verify = function (req, res, next) {
  let token = req.cookies[cookieKey]
  if (!token) {
    token = req.headers.authorization
    if (!token) {
      return null
    }
  }
  try {

    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}

## 静态路径
app.use(express.static(staticRoot))
## 参数格式解析
app.use(express.urlencoded({
  extended: true
}))
// 解析multipart/form-data数据

// 解析json数据格式
app.use(express.json())
<!-- 解析文件 -->
const multer = require('multer')
function fileFilter(req, file, cb) {
  const whiteList = [".jpg"]
  const extname = path.extname(file.originalname)
  if (whiteList.includes(extname)) {
    cb(null, true)
  } else {
    cb(new Error(`your ext name of ${extname} not supported`))
  }
  //   // 这个函数应该调用 `cb` 用boolean值来
  //   // 指示是否应接受该文件

  //   // 拒绝这个文件，使用`false`，像这样:
  //   cb(null, false)

  //   // 接受这个文件，使用`true`，像这样:
  //   cb(null, true)

  //   // 如果有问题，你可以总是这样发送一个错误:
  //   cb(new Error('I don\'t have a clue!'))

}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/upload"))
  },
  filename: function (req, file, cb) {
    const timeStamp = Date.now()
    const random = Math.random().toString(36).slice(-6)
    const extname = path.extname(file.originalname)
    cb(null, timeStamp + random + extname)
    // cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024
  }
})



## api
// 处理api的请求
app.use("/api/student", require("./api/student"))
app.use("/api/login", require("./api/admin"))
app.use("/api/upload", require("./api/upload"))


// 处理错误的中间件
const {
  getErr
} = require("./getSendResult")
const multer = require('multer')
module.exports = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(200).send(getErr(err.message))
    }
    // 发生了错误
    res.status(500).send(getErr(err))
  } else {
    next()
  }
}
## 图片下载
const express = require("express")
const path = require("path")
const router = express.Router()
router.get("/:filename", (req, res) => {
  const absPath = path.resolve(__dirname, "../../resources", req.params.filename)
  //   文件路径 文件名字
  res.download(absPath, req.params.filename)
})

## 图片水印
Jimp
// 给一张图片添加水印
async function mark(waterFile, originFile, targetFile, proportion = 10, marginProprtion = 0.05) {
  console.log(waterFile)
  const [water, origin] = await Promise.all([
    Jimp.read(waterFile),
    Jimp.read(originFile),
  ]);
  //   对水印图片进行缩放
  const curProportion = origin.bitmap.width / water.bitmap.width
  water.scale(curProportion / proportion)
  //   计算位置
  const right = origin.bitmap.width * marginProprtion
  const bottom = origin.bitmap.height * marginProprtion
  const x = origin.bitmap.width - right - water.bitmap.width
  const y = origin.bitmap.height - bottom - water.bitmap.height
  //   写入水印
  origin.composite(water, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.3
  })
  await origin.write(targetFile)


}

## 图片防盗链
const path = require("path");
const url = require("url")
module.exports = (req, res, next) => {
  // 只处理图片
  const extname = path.extname(req.path)
  if (![".jpg", ".jpeg", ".png", ".gif"].includes(extname)) {
    next()
    return
  }
  const host = req.headers.host;
  let referer = req.headers.referer;
  if (referer) {
    referer = url.parse(referer).host
  }
  if (referer && host !== referer) {
    // res.status(404).end()
    req.url = "/upload/logo.jpg"
  }
  next()
}

## 代理
https://www.npmjs.com/package/http-proxy-middleware
pnpm install --save-dev http-proxy-middleware


const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = createProxyMiddleware("/data", {
  pathRewrite: function (path, req) {
    return path.replace('/data', '/')
  },
  target: "http://yuanjin.tech:5100",
})

## 模版引擎
mustache
ejs
pnpm install ejs


const str = `
生成的数字是：<%= number%>
`
const result = ejs.render(str, {
  number: Math.random()
})
console.log(result)


ejs.renderFile("./test.ejs", {
  number: Math.random()
}).then(result => {
  console.log(result)
})

## 生成二维码
node-qrcode

https://www.npmjs.com/package/node-qrcode

## 生成验证码
node-canvas
https://github.com/Automattic/node-canvas

svg-captcha
https://www.npmjs.com/package/svg-captcha
var svgCaptcha = require('svg-captcha');
 


 
app.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create({

    });
    req.session.captcha = captcha.text;
    
    res.type('svg');
    res.status(200).send(captcha.data);
});

## Markdown editor
https://imzbf.github.io/md-editor-v3/zh-CN/demo/


## websocket