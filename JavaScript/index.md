number
string
boolean
symbol
null
undefined
bigInt

object

# 数值转换

## Number

使用 Number 函数，可以将任意类型的值转化成数值。
（1）原始类型值

```js
// 数值：转换后还是原来的值
Number(324); // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324'); // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc'); // NaN

// 空字符串转为0
Number(''); // 0

// 布尔值：true 转成 1，false 转成 0
Number(true); // 1
Number(false); // 0

// undefined：转成 NaN
Number(undefined); // NaN

// null：转成0
Number(null); // 0
```

（2）对象
第一步，调用对象自身的 valueOf 方法。如果返回原始类型的值，则直接对该值使用 Number 函数，不再进行后续步骤。
第二步，如果 valueOf 方法返回的还是对象，则改为调用对象自身的 toString 方法。如果 toString 方法返回原始类型的值，则对该值使用 Number 函数，不再进行后续步骤。

第三步，如果 toString 方法返回的是对象，就报错。
如果 toString 方法返回的不是原始类型的值，结果就会报错。

```js
Number({ a: 1 }); // NaN
Number([1, 2, 3]); // NaN
Number([5]); // 5
```

## String

String( )
（1）原始类型值
数值：转为相应的字符串。
字符串：转换后还是原来的值。
布尔值：true 转为字符串"true"，false 转为字符串"false"。
undefined：转为字符串"undefined"。
null：转为字符串"null"。
（2）对象
先调用对象自身的 toString 方法。如果返回原始类型的值，则对该值使用 String 函数，不再进行以下步骤。
如果 toString 方法返回的是对象，再调用原对象的 valueOf 方法。如果 valueOf 方法返回原始类型的值，则对该值使用 String 函数，不再进行以下步骤。
如果 valueOf 方法返回的是对象，就报错。

    String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
    String({a: 1}) // "[object Object]"
    String([1, 2, 3]) // "1,2,3"

## Boolean( )

它的转换规则相对简单：除了以下五个值的转换结果为 false，其他的值全部为 true。

undefined
null
0（包含-0 和+0）
NaN
''（空字符串）

## 自动转换（隐式转换）

第一种情况，不同类型的数据互相运算。
123 + 'abc' // "123abc"
第二种情况，对非布尔值类型的数据求布尔值
if ('abc') {
console.log('hello')
} // "hello"
第三种情况，对非数值类型的值使用一元运算符（即+和-）。
``js + {foo: 'bar'} // NaN - [1, 2, 3] // NaN `
自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用 String()函数进行转换。如果该位置既可以是字符串，也可能是数值，那么默认转为数值

```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

# 作用域和作用域链

什么是作用域
作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。
换句话说，作用域决定了代码区块中变量和其他资源的可见性。

我们知道 JavaScript 属于解释型语言，JavaScript 的执行分为：解释和执行两个阶段，这两个阶段所做的事并不一样
**解释阶段**
词法分析
语法分析
作用域规则确定
**执行阶段**
创建执行上下文
执行函数代码
垃圾回收
执行上下文最明显的就是 this 的指向是执行时确定的。而作用域访问的变量是编写代码的结构确定的。
作用域和执行上下文之间最大的区别是：
执行上下文在运行时确定，随时可能改变，作用域在定义时就确定，并且不会改变。

# 事件流

IE 的事件流是事件冒泡流，而 Netscape 的事件流是事件捕获流。
事件捕获流
Netscape Communicator 团队提出的另一种事件流叫做事件捕获（event captruing）。

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

事件捕获的思想是在事件到达预定目标之前就捕获它。
标准 DOM 事件流
DOM 标准采用的是捕获 + 冒泡的方式。

两种事件流都会触发 DOM 的所有对象，从 document 对象开始，也在 document 对象结束。

换句话说，起点和终点都是 document 对象（很多浏览器可以一直捕获 + 冒泡到 window 对象）

# 事件委托

上面介绍了事件冒泡流，事件冒泡一个最大的好处就是可以实现事件委托

# 阻止默认行为

（1）cancelable 属性

首先要介绍的是 cancelable 属性，该属性返回一个布尔值，表示事件是否可以取消。

该属性为只读属性。返回 true 时，表示可以取消。否则，表示不可取消。

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  test.innerHTML = event.cancelable; // true
};
```

（2）preventDefault 方法

preventDefault 方法是 DOM 中最常见，也是最标准的取消浏览器默认行为的方式，无返回值。
（3）returnValue 属性

    这种方式使用的人比较少，知道这种方式的人也比较少。

    首先 returnValue 是一个 event 对象上面的属性。该属性可读可写，默认值是 true，将其设置为 false 就可以取消事件的默认行为，与 preventDefault 方法的作用相同。

    该属性最早是在 IE 的事件对象中，实现了这种取消默认行为的方式，但是现在大多数浏览器都实现了该方式。
    event.returnValue = false;

（4）return false

    return false 是一条语句，该语句写在事件处理函数中也可以阻止默认行为。

    但是需要注意的是，如果该条语句写在 jQuery 代码中，能够同时阻止默认行为和阻止冒泡，但是在原生 JavaScript 中只能阻止默认行为。

（5）defaultPrevented 方法

defaultPrevented 属性也是 event 对象上面的一个属性。该属性表示默认行为是否被阻止，返回 true 表示被阻止，返回 false 表示未被阻止。

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  // 采用两种不同的方式来阻止浏览器默认行为，这是为了照顾其兼容性
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  // 将是否阻止默认行为的结果赋值给 <a> 标签的文本内容
  test.innerHTML = event.defaultPrevented;
};
```

// 方法一：全支持
event.preventDefault();
// 方法二：该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
event.returnValue = false;
// 方法三：不建议滥用，jQuery 中可以同时阻止冒泡和默认事件
return false

# 原型对象与原型链

一开始作者喜欢函数式编程，没有用面向对象的方式，所以用了原型这个概念去创建对象
假设对象是由构造函数生产的，前面我们说过，那只是表象，只是模拟，
最终底层仍然采用的是原型的方式。并且构造函数、实例对象以及原型对象这三者之间

# this 指向

https://gitee.com/dev-edu/frontend-interview-javascript/blob/master/09.%20this%E6%8C%87%E5%90%91/this%E6%8C%87%E5%90%91.md#this-%E6%8C%87%E5%90%91

## call

call(this 指向，参数)

# 属性描述符

在 JavaScript 中，对象的属性可以分为两种：

数据属性：它的本质就是一个数据

存取器属性：它的本质是一个函数，但是可以将它当作普通属性来使用，当给该属性赋值时，会运行相应的 setter 函数，当获取该属性的值时，会运行相应的 getter 函数。除了存取器，还有一些其他的关键字，用以表示当前属性是否可写、是否有默认值、是否可枚举等，这些关键字就是属性描述符。
属性描述符是 ECMAScript 5 新增的语法，它其实就是一个内部对象，用来描述对象的属性的特性。

属性描述符的结构
在定义对象、定义属性时，我们曾经介绍过属性描述符，属性描述符实际上就是一个对象。

属性描述符一共有 6 个，可以选择使用。

value：设置属性值，默认值为 undefined。
writable：设置属性值是否可写，默认值为 false。
enumerable：设置属性是否可枚举，即是否允许使用 for/in 语句或 Object.keys( ) 函数遍历访问，默认为 false。
configurable：可以禁止修改属性描述符，当设置为 false 时，该属性的类型不能在数据属性和访问器属性之间更改，且该属性不可被删除，且其描述符的其他属性也不能被更改（但是，如果它是一个可写的数据描述符，则 value 可以被更改，writable 可以更改为 false）。默认值为 false。
get：取值函数，默认为 undefined。
set：存值函数，默认为 undefined。

## 函数防抖

我们首先来看函数防抖。函数防抖，是指防止函数在极短的时间内反复调用，造成资源的浪费。

```
/**
 * 函数防抖
 * @param {function} func 一段时间后，要调用的函数
 * @param {number} wait 等待的时间，单位毫秒
 */
function debounce(func, wait) {
    // 设置变量，记录 setTimeout 得到的 id
    var timerId = null;
    return function (...args) {
        if (timerId) {
            // 如果有值，说明目前正在等待中，清除它
            clearTimeout(timerId);
        }
        // 重新开始计时
        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    }
}
```

## 函数节流

函数节流的核心思想是让连续的函数执行，变为固定时间段间断地执行。

```js
/**
 *
 * @param {要进行节流的函数} func
 * @param {间隔时间} wait
 * @returns
 */
function throttle(func, wait) {
  var args; // 存储函数参数
  var previous = 0; // 一开始的默认时间
  return function () {
    var now = new Date(); // 获取最新的时间戳
    args = arguments; // 获取参数
    // 进行时间戳的判断，如果超出规定时间，则执行
    if (now - previous > wait) {
      func.apply(null, args);
      previous = now;
    }
  };
}
```

XHR -> XMLHttpRequest-可以监控请求进度， service worker 中不可以用 event，已经停止更新了
fetch -> 不可以监控请求进度，可以控制 cookie 的携带，可以自定义 referrer，promise 请求
都可以监控请求响应进度

```js
xhr.addeventListener('progress', function (e) {
  console.log(e.loaded, e.total);
});
xhr.upload.addEventListener('progress', function (e) {});

const header = await fetch('https://www.baidu.com', {});
const total = header.headers.get('content-length');
const reader = header.body.getReader();
let loaded = 0;
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  loaded += value.length;
}
```
