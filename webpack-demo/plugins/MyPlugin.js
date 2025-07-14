class MyPlugin {
  apply(compiler) {
    // 可以在这里注册事件，类似于window.onload
    // compiler.hooks.事件名称.事件类型(name,function(compilation){//事件处理函数})
    // console.log("我的插件")
    // compiler.hooks.done.tap('MyPlugin', function (compilation) {
    //   console.log("完成")
    // })
    compiler.hooks.emit.tap("HtmlPlugin", compilation => {
      console.log(compilation.asstes)
      // compilation.hooks.processAssets.tap({
      //   name: 'HtmlPlugin',
      // }, (assets) => {
      //   console.log(assets, "---")
      // })
    })
  }
}
module.exports = MyPlugin
