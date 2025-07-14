const express = require('express');
const path = require('path');
const app = express();
const staticRoot = path.resolve(__dirname, './public');
app.use(
  express.static(staticRoot, {
    // maxAge: 3600 * 1000
    setHeaders(res, path) {
      if (!path.endsWith('.html')) {
        // 其他文件长久缓存。除了html
        res.header('cache-control', `max-age=${3600 * 1000 * 24 * 265 * 100}`);
      }
    },
  }),
);
app.use(express.json());
app.use('/api', require('./routes/index'));
const port = 9006;
app.listen(port, () => {
  console.log('localhost:' + port);
});
