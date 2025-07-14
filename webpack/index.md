# 如何在浏览器端实现模块化 {ignore}

[toc]

## 课程简介

本门课需要的前置知识：ES6、模块化、包管理器、git

本门课的讲解特点：

1. 合适的深度：webpack使用层面很简单，但原理层面非常复杂
2. 合适的广度：webpack生态圈极其繁荣，有海量的第三方库可以融入到webpack

## 浏览器端的模块化

问题：

- 效率问题：精细的模块划分带来了更多的JS文件，更多的JS文件带来了更多的请求，降低了页面访问效率
- 兼容性问题：浏览器目前仅支持ES6的模块化标准，并且还存在兼容性问题
- 工具问题：浏览器不支持npm下载的第三方包

这些仅仅是前端工程化的一个缩影

当开发一个具有规模的程序，你将遇到非常多的非业务问题，这些问题包括：执行效率、兼容性、代码的可维护性可扩展性、团队协作、测试等等等等，我们将这些问题称之为工程问题。工程问题与业务无关，但它深刻的影响到开发进度，如果没有一个好的工具解决这些问题，将使得开发进度变得极其缓慢，同时也让开发者陷入技术的泥潭。

## 根本原因

思考：上面提到的问题，为什么在node端没有那么明显，反而到了浏览器端变得如此严重呢？

答：在node端，运行的JS文件在本地，因此可以本地读取文件，它的效率比浏览器远程传输文件高的多

**根本原因**：在浏览器端，开发时态（devtime）和运行时态（runtime）的侧重点不一样

**开发时态，devtime：**

1. 模块划分越细越好
2. 支持多种模块化标准
3. 支持npm或其他包管理器下载的模块
4. 能够解决其他工程化的问题

**运行时态，runtime：**

1. 文件越少越好
2. 文件体积越小越好
3. 代码内容越乱越好
4. 所有浏览器都要兼容
5. 能够解决其他运行时的问题，主要是执行效率问题

这种差异在小项目中表现的并不明显，可是一旦项目形成规模，就越来越明显，如果不解决这些问题，前端项目形成规模只能是空谈

## 解决办法

既然开发时态和运行时态面临的局面有巨大的差异，因此，我们需要有一个工具，这个工具能够让开发者专心的在开发时态写代码，然后利用这个工具将开发时态编写的代码转换为运行时态需要的东西。

这样的工具，叫做**构建工具**

![](assets/2020-01-07-05-06-11.png)

这样一来，开发者就可以专注于开发时态的代码结构，而不用担心运行时态遇到的问题了。

## 常见的构建工具

- **webpack**
- grunt
- gulp
- browserify
- fis
- 其他
# webpack的安装和使用 {ignore}

[toc]

> webpack官网：https://www.webpackjs.com/
> 目前的最新版本：webpack4

## webpack简介

webpack是基于模块化的打包（构建）工具，它把一切视为模块

它通过一个开发时态的入口模块为起点，分析出所有的依赖关系，然后经过一系列的过程（压缩、合并），最终生成运行时态的文件。

webpack的特点：

- **为前端工程化而生**：webpack致力于解决前端工程化，特别是浏览器端工程化中遇到的问题，让开发者集中注意力编写业务代码，而把工程化过程中的问题全部交给webpack来处理
- **简单易用**：支持零配置，可以不用写任何一行额外的代码就使用webpack
- **强大的生态**：webpack是非常灵活、可以扩展的，webpack本身的功能并不多，但它提供了一些可以扩展其功能的机制，使得一些第三方库可以融于到webpack中
- **基于nodejs**：由于webpack在构建的过程中需要读取文件，因此它是运行在node环境中的
- **基于模块化**：webpack在构建过程中要分析依赖关系，方式是通过模块化导入语句进行分析的，它支持各种模块化标准，包括但不限于CommonJS、ES6 Module

## webpack的安装

webpack通过npm安装，它提供了两个包：

- webpack：核心包，包含了webpack构建过程中要用到的所有api
- webpack-cli：提供一个简单的cli命令，它调用了webpack核心包的api，来完成构建过程

安装方式：

- 全局安装：可以全局使用webpack命令，但是无法为不同项目对应不同的webpack版本
- **本地安装**：推荐，每个项目都使用自己的webpack版本进行构建

## 使用

```shell
webpack
```

默认情况下，webpack会以```./src/index.js```作为入口文件分析依赖关系，打包到```./dist/main.js```文件中

通过--mode选项可以控制webpack的打包结果的运行环境

## 配置 webpack.config.js
<!-- 源码打包好的调试 -->
https://webpack.docschina.org/configuration/devtool/#root
devtool:""
moudule.exports={

}

## 编译过程
1.初始化
+ 此阶段，webpack会将CLI参数、配置文件、默认配置进行融合，形成一个最终的配置
wepack.config.js进行配置
用到了第三方库yargs，就是用于融合配置的

2. **构建所有依赖模块**
- 创建chunk
chunk就是webpack构建过程中的一个概念，译为***块***,它表示通过某个入口找到所有依赖的统称，
每个chunk都是一个文件
每个chunk都有至少两个属性
name:默认main
id:唯一的编号，开发环境和name相同，生成环境是一个数字默认从0开始
- 构建所有的依赖模块
    构建所有依赖模块

![](assets/2020-01-09-12-32-38.png)

> AST在线测试工具：https://astexplorer.net/

3. **产生chunk assets**

在第二步完成后，chunk中会产生一个模块列表，列表中包含了**模块id**和**模块转换后的代码**

接下来，webpack会根据配置为chunk生成一个资源列表，即```chunk assets```，资源列表可以理解为是生成到最终文件的文件名和文件内容

![](assets/2020-01-09-12-39-16.png)

> chunk hash是根据所有chunk assets的内容生成的一个hash字符串
> hash：一种算法，具体有很多分类，特点是将一个任意长度的字符串转换为一个固定长度的字符串，而且可以保证原始内容不变，产生的hash字符串就不变

简图

![](assets/2020-01-09-12-43-52.png)

4. **合并chunk assets**

将多个chunk的assets合并到一起，并产生一个总的hash

![](assets/2020-01-09-12-47-43.png)

# hash的区别
hash 根据总资源生成的hash
chunkhash   根据每一个chunk生成的hash
contenthash 根据某个具体的文件生成的hash

# loader
loader的功能定位是转换代码，把非js代码转换成js代码
# plugin
loader的功能定位是转换代码，而一些其他的操作难以使用loader完成，比如：

当webpack生成文件时，顺便多生成一个说明描述文件
当webpack编译启动时，控制台输出一句话表示webpack启动了
当xxxx时，xxxx
这种类似的功能需要把功能嵌入到webpack的编译流程中，而这种事情的实现是依托于plugin的

apply函数会在初始化阶段，创建好Compiler对象后运行。
compiler.hooks.事件名称.事件类型(name,function(compilation){//事件处理函数})


compiler对象是在初始化阶段构建的，整个webpack打包期间只有一个compiler对象，后续完成打包工作的是compiler对象内部创建的compilation

事件名称

即要监听的事件名，即钩子名，所有的钩子：https://www.webpackjs.com/api/compiler-hooks

事件类型
emit :生成资源到output目录之前
     compiler.hooks.emit.tap("FileListPlugin",complation=>{
        
    })
afterEmit:生成资源到output目录之后

这一部分使用的是 Tapable API，这个小型的库是一个专门用于钩子函数监听的库。

它提供了一些事件类型：

tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
tapAsync：注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
tapPromise：注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束
处理函数

处理函数有一个事件参数compilation

# 区分环境
npx webpack --env prod

在webpack.config.js中写一个函数
```
module.exports = (env) => {
  可以根据env区分不同环境倒出对应的配置对象
  return {
    entry: './src/index.js',
    mode: "development",
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
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
```
# 其他细节配置 {ignore}

[toc]

## context

```js
context: path.resolve(__dirname, "app")
```

该配置会影响入口和loaders的解析，入口和loaders的相对路径会以context的配置作为基准路径，这样，你的配置会独立于CWD（current working directory 当前执行路径）

## output
 
### library

```js
output:{
    library: "abc"
}
```

这样一来，打包后的结果中，会将自执行函数的执行结果暴露给abc 

### libraryTarget

```js
output:{
    libraryTarget: "var"
}
```

该配置可以更加精细的控制如何暴露入口包的导出结果

其他可用的值有：

- var：默认值，暴露给一个普通变量
- window：暴露给window对象的一个属性
- this：暴露给this的一个属性
- global：暴露给global的一个属性
- commonjs：暴露给exports的一个属性
- 其他：https://www.webpackjs.com/configuration/output/#output-librarytarget

## target

```js
target:"web" //默认值
```

设置打包结果最终要运行的环境，常用值有

- web: 打包后的代码运行在web环境中
- node：打包后的代码运行在node环境中
- 其他：https://www.webpackjs.com/configuration/target/

## module.noParse

```js
noParse: /jquery/
```

不解析正则表达式匹配的模块，通常用它来忽略那些大型的单模块库，以提高**构建性能**

## resolve

resolve的相关配置主要用于控制模块解析过程

### modules

```js
modules: ["node_modules"]  //默认值
```

当解析模块时，如果遇到导入语句，```require("test")```，webpack会从下面的位置寻找依赖的模块

1. 当前目录下的```node_modules```目录
2. 上级目录下的```node_modules```目录
3. ...

### extensions

```js
extensions: [".js", ".json"]  //默认值
```

当解析模块时，遇到无具体后缀的导入语句，例如```require("test")```，会依次测试它的后缀名

- test.js
- test.json

### alias

```js
alias: {
  "@": path.resolve(__dirname, 'src'),
  "_": __dirname
}
```

有了alias（别名）后，导入语句中可以加入配置的键名，例如```require("@/abc.js")```，webpack会将其看作是```require(src的绝对路径+"/abc.js")```。

在大型系统中，源码结构往往比较深和复杂，别名配置可以让我们更加方便的导入依赖

## externals

```js
externals: {
    jquery: "$",
    lodash: "_"
}
```

从最终的bundle中排除掉配置的配置的源码，例如，入口模块是

```js
//index.js
require("jquery")
require("lodash")
```

生成的bundle是：

```js
(function(){
    ...
})({
    "./src/index.js": function(module, exports, __webpack_require__){
        __webpack_require__("jquery")
        __webpack_require__("lodash")
    },
    "jquery": function(module, exports){
        //jquery的大量源码
    },
    "lodash": function(module, exports){
        //lodash的大量源码
    },
})
```

但有了上面的配置后，则变成了

```js
(function(){
    ...
})({
    "./src/index.js": function(module, exports, __webpack_require__){
        __webpack_require__("jquery")
        __webpack_require__("lodash")
    },
    "jquery": function(module, exports){
        module.exports = $;
    },
    "lodash": function(module, exports){
        module.exports = _;
    },
})
```

这比较适用于一些第三方库来自于外部CDN的情况，这样一来，即可以在页面中使用CDN，又让bundle的体积变得更小，还不影响源码的编写

## stats

stats控制的是构建过程中控制台的输出内容


# 常用扩展
清楚输出目录
clean-webpack-plugin
自动生成页面
html-webpack-plugin
复制静态资源
copy-webpack-plugin