 const redis = require("redis")
 let client;
 async function initRedis() {
   client = await redis.createClient().on("error", (err) => console.log("Redis Client Error", err)).connect();
   return client
 }
 module.exports = function (options) {
   const isJSON = options.isJSON === undefined ? true : options.isJSON;
   const ttl = options.ttl
   return async function (req, res, next) {
     const key = req.originalUrl;
     const client = await initRedis()
     const val = await client.get(key)
     if (val) {
       const body = isJSON ? JSON.parse(content) : content;
       res.send(body);
     } else {
       //没有缓存
       // 后面返回缓存
       //   express写响应体，最终通过res.write函数完成的
       // 重新write函数
       const defaultWrite = res.write.bind(res),
         defaultEnd = res.end.bind(res);
       const chunks = []
       res.write = function (chunk, ...args) {
         chunks.push(chunk);
         defaultWrite(chunk, ...args);
       };
       res.end = function (chunk, args) {
         //  const body = chunks.map((c) => c.toString("utf-8")).join();
         //  if (ttl < 0) {
         //    client.set(key, body)
         //  } else {
         //    client.set(key, body, "EX", ttl)
         //  }

         defaultEnd(chunk, ...args);
       }
       next()
     }
   }

 }
