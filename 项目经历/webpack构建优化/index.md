# Webpack构建优化技术讲解

## 什么问题

一些老旧的项目，脚手架使用的是 create-react-app 或者 vue-cli 搭建的，这一类的项目会随着项目的规模越变越大后，每次启动项目时所花费的时间也会越来越长，这是在维护一些旧项目时的一个痛点。

原因：基于 Webpack 的项目，即便是在开发环境下，也是要先打包才能在浏览器看到效果。

## 解决思路

speed-measure-webpack-plugin：该插件主要用于分析打包的时候各个地方的耗时情况。

分析过后，往往存在这么几个方面比较耗时：

1. JavaScript 编译：Babel 编译 JavaScript 代码花费了大量时间。
2. 打包时间：Webpack 的模块打包花费了很长时间，特别是在处理大型依赖和复杂的项目结构时。
3. 插件耗时：一些插件，如 TerserWebpackPlugin（用于代码压缩），在处理大量代码时会变得非常慢。
4. 文件读取与写入：文件系统操作，特别是读取和写入缓存，耗时较长。
5. 热更新（HMR）：在开发环境中，热更新的处理时间也较长，特别是在修改较多文件时。

确定了问题之后，就可以逐个点进行优化：

1. 用 swc 替换 babel
2. 使用 thread-loader
3. 利用 webpack5 的持久化缓存技术
4. 开发环境去掉 hash，生成环境要保留
5. 升级老旧的 plugin

## 解决细节

**1. 使用speed-measure-webpack-plugin进行耗时的分析**

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const webpackConfig = {
  // 你的 Webpack 配置
};

module.exports = smp.wrap(webpackConfig);
```

该插件还提供了一些配置项：

```js
const smp = new SpeedMeasurePlugin({
  // 输出结果的格式，'json'、'human'（默认）或 'verbose'
  outputFormat: 'human',
  // 输出结果的目标路径
  outputTarget: console.log,
  // 是否在插件耗时结果中显示每个 loader 的详细信息
  loaderTopFiles: 10,
  // 是否在详细模式中显示每个 loader 处理的文件数量
  loaderCount: true,
});
```

回头就会生成一份报告：

```bash
Speed Measure Plugin
General output time took 1354 ms
Top 10 plugins
 - HtmlWebpackPlugin took 320 ms
 - MiniCssExtractPlugin took 280 ms
 - TerserPlugin took 150 ms
 - DefinePlugin took 110 ms
 - ...
Top 10 loaders
 - babel-loader took 600 ms
 - css-loader took 200 ms
 - style-loader took 180 ms
 - file-loader took 120 ms
 - ...
```

该报告就会包含如下的信息：

1. 总体构建时间：Webpack 完整构建的总时间。
2. 各个阶段的耗时：例如，解析依赖、构建模块、优化和输出资源等阶段的时间。
3. 插件耗时：每个插件在构建过程中所花费的时间。
4. loader 耗时：每个 loader 处理文件时所花费的时间。

根据这份报告，就可以有目标的进行优化。

还有一个常用插件：

- Webpack Bundle Analyzer：主要是分析打包后资源文件的大小，会生成一个交互式的可视化图表。
- Speed Measure Webpack Plugin：主要分析 Webpack 构建过程中的时间消耗。

**2. 用 swc 替换 babel**

全称是 Speedy Web Compiler，它是一个使用 Rust 编写的编译器。

官网：https://swc.rs/

swc 特点：

1. 高性能
2. 兼容性
3. 生态系统

使用 swc 替换 babel 之后，能够获取到的性能上面的收益：

1. 编译速度
2. 多线程处理
3. 内存管理

**3. 使用 thread-loader**

thread-loader 是一个 Webpack 的 loader，可以将某些耗时的操作（如文件编译和转换）放在子线程中执行，从而减少主线程的负载，提高构建性能。

thread-loader 主要提供的也就是多线程并行处理的优势：

- 单线程瓶颈：默认情况下，Webpack 在主线程中逐个处理文件。对于大型项目或复杂的转换操作，这种单线程模式可能会导致严重的性能瓶颈。
- 并行加速：thread-loader 通过**创建多个子线程**，并行处理文件，从而减少主线程的负载，加速整个编译过程。

**4. 利用 webpack5 的持久化缓存技术**

持久化缓存技术是 webpack5 引入的新技术，可以对构建内容进行缓存：

- memory：缓存在内存中，适用于开发环境
- filesystem：以文件的形式缓存在磁盘上，适用于生产环境

一般缓存的内容：

1. 模块缓存
2. 解析缓存
3. 插件缓存

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
   // ...
  },
  module: {
   // ..
  },
  cache: {
    type: 'filesystem', // 使用文件系统进行缓存
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'), // 缓存目录
    buildDependencies: {
      config: [__filename], // 当配置文件改变时，重新构建缓存
    },
    name: 'my-cache', // 缓存名称
    version: '1.0', // 缓存版本
  },
};
```

**5. 开发环境去掉 hash**

在 webpack 配置中，hash 的目的是为了生成唯一的文件名：`bundle.(hash).js`

不同环境下对 hash 的需求是不一样的：

- 开发环境：频繁进行代码修改和构建，**不需要长时间缓存**，生成 hash 会增加不必要的构建时间。
- 生产环境：希望生成 hash，以便**利用浏览器缓存机制**，提高加载速度。

因此在 webpack 配置文件里面，就可以动态的配置是否要生成 hash：

```js
const path = require('path');

module.exports = (env, argv) => {
  // 获取当前的构建模式
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      // 根据不同的构建模式来决定生成的文件名是否要包含 hash 值
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
          },
        },
      ],
    },
    cache: {
      type: 'filesystem',
    },
  };
};
```

在 package.json 中可以配置启动模式：

```js
{
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

**6. 升级老旧的 plugin**

例如升级 terser-webpack-plugin，这个插件使用了压缩代码的，新版本相比旧版本就有很大的提升：

1. 性能改进：

   - 算法优化：插件的新版本通常包含更高效的算法和优化策略，可以在保持相同压缩率的同时加快压缩速度。

   - 多线程处理：新版本可能引入了对多线程的支持，从而利用多核 CPU 提升压缩性能。

2. Bug 修复和改进：

   - 修复性能瓶颈：老版本可能存在一些未被发现的性能瓶颈或 bug，通过升级可以避免这些问题。

   - 代码改进：维护者和社区贡献者会不断地改进插件的代码，以提高其性能和稳定性。

3. 新特性：

   - 缓存支持：新版本支持持久化缓存功能，从而避免重复压缩相同的代码块，进一步提升构建速度。

   - 配置优化：简化和改进配置选项，使得更容易进行性能调优。


---

-EOF-
