# _import_ 指令

## 经典真题

- _CSS_ 引用的方式有哪些？_link_ 和 _@import_ 的区别？

## 来看看 _import_ 指令是啥

_import_ 指令是用来导入 _CSS_ 样式的。

什么？导入样式不是已经有 _link_ 标签了么？

没错，_link_ 标签可以导入外部 _CSS_ 样式，_import_ 仍然可以导入外部 _CSS_ 样式。

我们首先来看一下 _import_ 的基本用法

1. 在 _HTML_ 文件中导入外部样式

```html
<style>
  @import url('./index.css');
</style>
```

要在 _HTML_ 源代码直接应用 _@import_ 引入外部 _CSS_ 文件，须要将 _@import_ 放入 _style_ 标签

2. 在 _CSS_ 文件中引入另一个 _CSS_ 文件

```css
@import url('./index.css');
/* 后面书写其他样式 */
```

除了 _HTML_ 源代码中使用 _style_ 标签来运用 _@import_，在 _CSS_ 文件代码中依旧可以或许使用 _@import_，这个时候就不须要 _style_ 标签，而是直接应用 _@import_ 就可，这样便可实现一个（多个）_CSS_ 文件中引入套入别的一个（多个）_CSS_ 文件。

3. _@import_ 规则还支持媒体查询，因此可以允许依赖媒体的导入

```css
@import 'printstyle.css' print;
/* 只在媒体为 print 时导入 "printstyle.css" 样式表 */
```

```css
@import 'mobstyle.css' screen and (max-width: 768px);
/* 只在媒体为 screen 且视口最大宽度 768 像素时导入 "mobstyle.css" 样式表 */
```

看完了 _@import_ 的基本使用后，接下来我们来看一下它和 _link_ 的区别：

1. **_link_ 属于 _HTML_ 标签，而 _@import_ 完全是 _CSS_ 提供的一种方式。**

   _link_ 标签除了可以加载 _CSS_ 外，还可以做很多其它的事情，比如定义 _RSS_，定义 _rel_ 连接属性等，_@import_ 就只能加载 _CSS_ 了。

2. **加载顺序的差别。**

   比如，在 _a.css_ 中使用 _import_ 引用 _b.css_，只有当使用当使用 _import_ 命令的宿主 _css_ 文件 _a.css_ 被下载、解析之后，浏览器才会知道还有另外一个 _b.css_ 需要下载，这时才去下载，然后下载后开始解析、构建 _render tree_ 等一系列操作.

3. **兼容性的差别。**

   由于 _@import_ 是 _CSS2.1_ 提出的所以老的浏览器不支持，_@import_ 只有在 _IE5_ 以上的才能识别，而 _link_ 标签无此问题。

4. **当使用 _JS_ 控制 _DOM_ 去改变样式的时候，只能使用 _link_ 标签，因为 _@import_ 不是 _DOM_ 可以控制的**。

   对于可换皮肤的网站而言，可以通过改变 _link_ 标签这两个的 _href_ 值来改变应用不用的外部样式表，但是对于 _import_ 是无法操作的，毕竟不是标签。

另外，从性能优化的角度来讲，尽量要避免使用 _@import_。

使用 _@import_ 引入 _CSS_ 会影响浏览器的并行下载。使用 _@import_ 引用的 _CSS_ 文件只有在引用它的那个 _CSS_ 文件被下载、解析之后，浏览器才会知道还有另外一个 _CSS_ 需要下载，这时才去下载，然后下载后开始解析、构建 _Render Tree_ 等一系列操作。

多个 _@import_ 会导致下载顺序紊乱。在 _IE_ 中，_@import_ 会引发资源文件的下载顺序被打乱，即排列在 _@import_ 后面的 _JS_ 文件先于 _@import_ 下载，并且打乱甚至破坏 _@import_ 自身的并行下载。

## 真题解答

- _CSS_ 引用的方式有哪些？_link_ 和 _@import_ 的区别？

> 参考答案：
>
> _CSS_ 引用的方式有：
>
> - 外联，通过 _link_ 标签外部链接样式表
> - 内联，在 _head_ 标记中使用 _style_ 标记定义样式
> - 嵌入，在元素的开始标记里通过 _style_ 属性定义样式
>
> _link_ 和 _@import_ 的区别：
>
> 1. **_link_ 属于 _HTML_ 标签，而 _@import_ 完全是 _CSS_ 提供的一种方式。**
>
>    _link_ 标签除了可以加载 _CSS_ 外，还可以做很多其它的事情，比如定义 _RSS_，定义 _rel_ 连接属性等，_@import_ 就只能加载 _CSS_ 了。
>
> 2. **加载顺序的差别。**
>
>    比如，在 _a.css_ 中使用 _import_ 引用 _b.css_，只有当使用当使用 _import_ 命令的宿主 _css_ 文件 _a.css_ 被下载、解析之后，浏览器才会知道还有另外一个 _b.css_ 需要下载，这时才去下载，然后下载后开始解析、构建 _render tree_ 等一系列操作.
>
> 3. **兼容性的差别。**
>
>    由于 _@import_ 是 _CSS2.1_ 提出的所以老的浏览器不支持，_@import_ 只有在 _IE5_ 以上的才能识别，而 _link_ 标签无此问题。
>
> 4. **当使用 _JS_ 控制 _DOM_ 去改变样式的时候，只能使用 _link_ 标签，因为 _@import_ 不是 _DOM_ 可以控制的**。
>
>    对于可换皮肤的网站而言，可以通过改变 _link_ 便签这两个的 _href_ 值来改变应用不用的外部样式表，但是对于 _import_ 是无法操作的，毕竟不是标签。

-_EOF_-

# _CSS3_ 的媒介(_media_)查询

## 经典真题

- 如何使用媒体查询实现视口宽度大于 _320px_ 小于 _640px_ 时 _div_ 元素宽度变成 _30%_

## 媒体查询

媒体查询英文全称 _Media Query_，顾名思义就是会查询用户所使用的媒体或者媒介。

在现在，网页的浏览终端是越来越多了。用户可以通过不同的终端来浏览网页，例如：_PC_，平板电脑，手机，电视等。尽管我们无法保证一个网站在不同屏幕尺寸和不同设备上看起来一模一样，但是至少要让我们的 Web 页面能适配用户的终端。

在 _CSS3_ 中的 _Media Query_ （媒体查询）模块就是用来让一个页面适应不同的终端的。

**_Media Type_ 设备类型**

首先我们来认识一下 _CSS_ 中所支持的媒体类型。

在 _CSS2_ 中常碰到的就是 _all_（全部）、_screen_（屏幕）和 _print_（页面打印或打印预览模式）。然而媒体的类型其实远不止这 _3_ 种。

在 _W3C_ 中共列出了 _10_ 种媒体类型，如下表所示：

| 值         | 设备类型                                         |
| ---------- | ------------------------------------------------ |
| All        | 所有设备                                         |
| Braille    | 盲人用点字法触觉回馈设备                         |
| Embossed   | 盲文打印机                                       |
| Handheld   | 便携设备                                         |
| Print      | 打印用纸或打印预览视图                           |
| Projection | 各种投影设备                                     |
| Screen     | 电脑显示器                                       |
| Speech     | 语音或音频合成器                                 |
| Tv         | 电视机类型设备                                   |
| Tty        | 使用固定密度字母栅格的媒介，比如电传打字机和终端 |

当然，虽然上面的表列出来了这么多，但是常用的也就是 _all_（全部）、_screen_（屏幕）和 _print_（页面打印或打印预览模式）这三种媒体类型。

**媒体类型引用方法**

引用媒体类型的方法有和很多，常见的媒体类型引用方法有：_link_ 标签、_xml_ 方式、_@import_ 和 _CSS3_ 新增的 _@media_。

1. _link_ 方法

_link_ 方法引入媒体类型其实就是在 _link_ 标签引用样式的时候，通过 _link_ 标签中的 _media_ 属性来指定不同的媒体类型，如下：

```html
<link rel="stylesheet" href="index.css" media="screen" />
<link rel="stylesheet" href="print.css" media="print" />
```

2. _xml_ 方式

_xml_ 方式和 _link_ 方式比较相似，也是通过 _media_ 属性来指定，如下：

```xml
<? xml-stylesheet rel="stylesheet" media="screen" href="style.css" ?>
```

3. _@import_

_@import_ 引入媒体类型主要有两种方式，一种是在 CSS 样式表中通过 _@import_ 调用另一个样式文件，另外一种是在 _style_ 标签中引入。

> 注意：_IE6_ 和 _IE7_ 中不支持该方式

在样式文件中引入媒体类型：

```css
@import url('./index.css') screen;
```

在 _style_ 标签中引入媒体类型：

```html
<style>
  @import url('./index.css') screen;
</style>
```

4. _@meida_ 的方式

_@media_ 是 _CSS3_ 中新引进的一个特性，称为媒体查询。_@media_ 引入媒体也有两种方式，如下：

在样式文件中引入媒体类型：

```css
@media screen {
  /* 具体样式 */
}
```

在 _style_ 标签中引入媒体类型：

```html
<style>
  @media screen {
    /* 具体样式 */
  }
</style>
```

虽然上面介绍了 _4_ 种引入方式，但是最常见的就是第 _1_ 种和第 _4_ 种。

**媒体查询具体语法**

接下来我们来看一下媒体查询的具体语法。

这里我们可以将 _Media Query_ 看成一个公式：

```markdown
Media Type（判断条件）+ CSS（符合条件的样式规则）
```

这里举例如下：

_link_ 的方式

```html
<link rel="stylesheet" media="screen and (max-width:600px)" href="style.css" />
```

_@media_ 的方式

```css
@meida screen and (max-width:600px) {
  /* 具体样式 */
}
```

上面的两个例子中都是使用 _width_ 来进行的样式判断，但是实际上还有很多特性都可以被用来当作样式判断的条件。

具体如下表：

![image-20210916165039143](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-16-085040.png)

有了 _Media Query_，我们能在不同的条件下使用不同的样式，使页面在不同的终端设备下达到不同的渲染效果。

这里有一个具体的公式如下：

```css
@media 媒体类型 and (媒体特性) {
  /* 具体样式 */
}
```

来看几个具体示例。

1. 最大宽度 _max-width_

该特性是指媒体类型小于或等于指定宽度时，样式生效，例如：

```css
@media screen and (max-width: 480px) {
  /* 具体样式 */
}
```

当屏幕宽度小于或等于 _480px_ 时，样式生效

2. 最小宽度 _min-width_

该特性和上面相反，及媒体类型大于或等于指定宽度时，样式生效，例如：

```css
@media screen and (min-width: 480px) {
  /* 具体样式 */
}
```

当屏幕宽度大于或等于 _480px_ 时，样式生效

3. 多个媒体特性混合使用

当需要多个媒体特性时，使用 _and_ 关键字将媒体特性结合在一起，例如：

```css
@media screen and (min-width: 480px) and (max-width: 900px) {
  /* 具体样式 */
}
```

当屏幕大于等于 _480px_ 并且小于等于 _900px_ 时，样式生效。

4. 设备屏幕的输出宽度 _Device Width_

在智能设备上，例如 _iphone、ipad_ 等，可以通过 _min-device-width_ 和 _max-device-width_ 来设置媒体特性，例如：

```css
@media screen and (max-device-height: 480px) {
  /* 具体样式 */
}
```

在智能设备上，当屏幕小于等于 _480px_ 时样式生效

5. _not_ 关键字

_not_ 关键词可以用来排除某种制定的媒体特性，示例如下：

```css
@media not print and (max-width: 900px) {
  /* 具体样式 */
}
```

样式代码将被用于除了打印设备和屏幕宽度小于或等于 _900px_ 的所有设备中。

6. 未指明 _Media Type_

如果在媒体查询中没有明确的指定 _Media Type_，那么其默认值为 _all_

```css
@media (max-width: 900px) {
  /* 具体样式 */
}
```

上面的样式适用于屏幕尺寸小于或等于 _900px_ 的所有设备。

更多关于媒体查询的内容可以参阅 _MDN_：*https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries*

## 真题解答

- 如何使用媒体查询实现视口宽度大于 _320px_ 小于 _640px_ 时 _div_ 元素宽度变成 _30%_

> 参考答案：
>
> ```css
> @media screen and (min-width: 320px) and (max-width: 640px) {
>   div {
>     width: 30%;
>   }
> }
> ```

-_EOF_-
