// const http = require("http")
// // /data/api/*** */ 转发到 另一个服务器
// module.exports = (req, res, next) => {
//   const context = "/data"
//   if (!req.path.startsWith(context)) {
//     return next()
//   }
//   const path = req.path.substring(context.length)

//   const request = http.request({
//     host: "yuanjin.tech",
//     port: 5100,
//     method: req.method,
//     path,
//     headers: req.headers
//   }, response => {
//     console.log("response", response)
//     // 代理对象response
//     res.status(response.statusCode)
//     // 响应头保持一致
//     for (const key in response.headers) {
//       if (response.hasOwnProperty(key)) {
//         const ele = response.headers[key]
//         res.setHeader(key, ele)
//       }
//     }
//     response.pipe(res)
//   })
//   req.pipe(request) //把请求体写入到代理请求的对象的请求体中
// }

const {
  createProxyMiddleware
} = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  pathRewrite: function (path, req) {
    return path.replace('/data', '/')
  },
  target: "http://yuanjin.tech:5100",
});
module.exports = apiProxy
