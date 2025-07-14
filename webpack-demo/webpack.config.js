const path = require('path');
var MyPlugin = require("./plugins/MyPlugin")
module.exports = (env) => {
  console.log(env)
  return {
    entry: './src/index.js',
    mode: "development",
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      library: "abc",
    },
    module: {
      rules: [{
        test: /index\.js/, //正则表达式，匹配模块的路径
        use: [
          // 每个加载器的使用是一个对象
          {
            loader: "./loaders/test-loader",
            options: {
              changeVar: "_",
              changeLet: "$"
            }
          }
        ] //匹配到了之后，需要使用的加载器
      }, {
        test: /\.css/, //正则表达式，匹配模块的路径
        use: [
          // 每个加载器的使用是一个对象
          {
            loader: "./loaders/css-loader"
          }
        ] //匹配到了之后，需要使用的加载器
      }, {
        test: /\.jpg/, //正则表达式，匹配模块的路径
        use: [
          // 每个加载器的使用是一个对象
          {
            loader: "./loaders/img-loader"
          }
        ] //匹配到了之后，需要使用的加载器
      }]
    },
    plugins: [
      new MyPlugin()
    ]
  };
}
