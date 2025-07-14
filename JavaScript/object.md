# 迭代

[Symbol.iterator]() {
return this;
},

# Object

constructor
AggregateError 聚合错误 AggregateError 是 Error 的子类
对象表示需要将多个错误包装在单个错误中时的错误。当一个作需要报告多个错误时，例如由 Promise.any（） 报告多个错误，当传递给它的所有 Promise 都被拒绝时，就会抛出它。
new AggregateError()

## 静态方法

Object.assign（） 静态方法从一个或多个复制所有可枚举自己的属性 源对象到目标对象 。它返回修改后的目标对象。
复制可枚举的自身属性
Object.create（） 静态方法创建一个新对象，使用现有对象作为新创建对象的原型。
复制一个原型对象
Object.defineProperties（） 静态方法直接在对象上定义新的属性或修改现有属性，并返回对象。

```js
const object = {};

Object.defineProperties(object, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
});

console.log(object.property1);
// Expected output: 42
```

Object.defineProperty（） 静态方法直接在对象上定义新属性，或修改对象上的现有属性，并返回该对象。

```js
const object = {};

Object.defineProperty(object, 'foo', {
  value: 42,
  writable: false,
});

object.foo = 77;
// Throws an error in strict mode

console.log(object.foo);
// Expected output: 42
```

Object.entries（） 静态方法返回给定对象自己的可枚举字符串键属性键值对的数组。
[key, value]
Object.freeze（） 静态方法冻结对象。冻结对象会阻止扩展， 并使现有属性不可写和不可配置。
Object.fromEntries（） 静态方法将键值对列表转换为对象
[key, value]=》{[key]:[value]}
包含对象列表的可迭代对象 ，例如 Array 或 Map。每个对象都应有两个属性：
Object.getOwnPropertyDescriptor() 获取对象自身属性的描述信息
const descriptor = Object.getOwnPropertyDescriptor(object, "foo");
Object.getOwnPropertyDescriptors() 给定对象的所有自己的属性描述符
Object.getOwnPropertyDescriptors(object)
Object.getOwnPropertySymbols() 静态方法返回直接在给定对象上找到的所有符号属性的数组。
Object.getPrototypeOf（） 静态方法返回指定对象的原型（即内部 [[Prototype]] 属性的值）。
Object.groupBy（） 根据提供的回调函数返回的字符串值对给定可迭代对象的元素进行分组。返回的对象对每个组都有单独的属性，其中包含包含组中元素的数组。
在某些浏览器的某些版本中，此方法被实现为 Array.prototype.group（） 方法。

```js
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 9 },
  { name: 'bananas', type: 'fruit', quantity: 5 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 12 },
  { name: 'fish', type: 'meat', quantity: 22 },
];

const result = Object.groupBy(inventory, ({ quantity }) =>
  quantity < 6 ? 'restock' : 'sufficient',
);
console.log(result.restock);
// [{ name: "bananas", type: "fruit", quantity: 5 }]
```

Object.hasOwn（） 返回属性是否是自身的对象
Object.is（）确定两个值是否为同一值 。
Object.isExtensible（） 确定对象是否可扩展（是否可以向其添加新属性）。
Object.isFrozen（） 静态方法确定对象是否为 冷冻。
Object.isSealed（） 静态方法确定对象是否被密封 。
Object.keys（） 返回给定对象自身的可枚举字符串键控属性名称的数组。
Object.preventExtensions（） 静态方法阻止将新属性添加到对象中（即，阻止将来对对象进行扩展）。它还防止重新分配对象的原型。

```js
const object = {};

Object.preventExtensions(object);

try {
  Object.defineProperty(object, 'foo', {
    value: 42,
  });
} catch (e) {
  console.log(e);
  // Expected output: TypeError: Cannot define property foo, object is not extensible
}
```

Object.seal（） 静态方法密封对象。密封对象会阻止扩展， 并使现有属性不可配置密封对象具有一组固定的属性：不能添加新属性，不能删除现有属性，不能更改它们的可枚举性和可配置性，并且不能重新分配其原型。只要现有属性的值是可写的，它们仍然可以更改。seal（） 返回传入的相同对象

```js
const object = {
  foo: 42,
};

Object.seal(object);
object.foo = 33;
console.log(object.foo);
// Expected output: 33

delete object.foo; // Cannot delete when sealed
console.log(object.foo);
// Expected output: 33
```

Object.setPrototypeOf（） 静态方法将指定对象的原型（即内部 [[Prototype]] 属性）设置为另一个对象或 null。

```js
const obj = {};
const parent = { foo: 'bar' };

console.log(obj.foo);
// Expected output: undefined

Object.setPrototypeOf(obj, parent);

console.log(obj.foo);
// Expected output: "bar"
```

Object.values（） 静态方法返回给定对象自己的可枚举字符串键属性值的数组。

## 原型对象

### hasOwnProperty()

    返回这个属性是否是这个对象的自身属性

```js
const object = {};
object.foo = 42;

console.log(object.hasOwnProperty('foo'));
// Expected output: true

console.log(object.hasOwnProperty('toString'));
// Expected output: false

console.log(object.hasOwnProperty('hasOwnProperty'));
// Expected output: false
```

### isPrototypeOf（） 方法检查此对象是否存在于另一个对象的原型链中。

```js
function Foo() {}
function Bar() {}

Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();

console.log(Foo.prototype.isPrototypeOf(bar));
// Expected output: true
console.log(Bar.prototype.isPrototypeOf(bar));
// Expected output: true
```

### propertyIsEnumerable（） 返回是否是自身的可枚举属性

### toLocaleString（） 方法返回表示此对象的字符串，此方法旨在被派生对象覆盖，以用于特定于区域设置的目的。

### toString（） 方法返回表示此对象的字符串。此方法旨在由自定义类型强制逻辑的派生对象重写。

```js
const map = new Map();

console.log(map.toString());
// Expected output: "[object Map]"
```

### valueOf（） 方法将 this 值转换为对象 。此方法旨在由自定义类型转换逻辑的派生对象重写。

# Function

## 原型方法

### apply（） 方法使用给定的 this 值调用此函数，并以数组（或类似数组的对象 ）形式提供的参数 。

```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2
```

### bind（） 方法创建一个新函数，当调用该函数时，调用该函数，并将其 this 关键字设置为提供的值，并在调用新函数时提供的任何参数之前给定的参数序列。

```js
const module = {
  x: 42,
  getX() {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
```

### call（） 方法使用给定的 this 值和单独提供的参数调用此函数。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// Expected output: "cheese"
```

### toString 返回该函数源代码的字符串

```js
function sum(a, b) {
  return a + b;
}

console.log(sum.toString());
// Expected output: "function sum(a, b) {
//                     return a + b;
//                   }"

console.log(Math.abs.toString());
// Expected output: "function abs() { [native code] }"
```

### [Symbol.hasInstance]（） 方法指定用于确定构造函数是否将对象识别为构造函数的实例之一的默认过程。它由 instanceof 运算符调用。

```js
class Foo {}
const foo = new Foo();
console.log(foo instanceof Foo === Foo[Symbol.hasInstance](foo)); // true
```

### displayName 指定函数的显示名称 （非标准）

如果 displayName 以字母数字字符 _ 和 $ 序列结尾，则显示最长的此类后缀。
如果 displayName 以 [] 括起来的字符序列结尾，则该序列显示时不带方括号。
如果 displayName 以字母数字字符序列和 _ 结尾，后跟一些 /、. 或 <，则返回的序列不带尾随 /、. 或 < 字符。
如果 displayName 以字母数字字符序列和 \_ 后跟 （^） 结尾，则显示该序列不带 （^）。

如果上述模式均不匹配，则显示整个 displayName。

```js
function a() {}
a.displayName = 'MyFunction';

a; // function MyFunction()
```

### length 属性指示函数所需的参数数

```js
function func1() {}

function func2(a, b) {}

console.log(func1.length);
// Expected output: 0

console.log(func2.length);
// Expected output: 2
```

### name data 属性指示创建时指定的函数名称，或者对于匿名创建的函数，它可以是匿名的或 ''（空字符串）。

```js
const func1 = function () {};

const object = {
  func2: function () {},
};

console.log(func1.name);
// Expected output: "func1"

console.log(object.func2.name);
// Expected output: "func2"
```

### prototype

当函数用作具有 new 运算符的构造函数时，将使用 Function 实例的原型数据属性。它将成为新对象的原型。

# Array

## 静态方法

### Array.from（） 静态方法从可迭代对象或类似数组的对象创建一个新的浅层复制 Array 实例。

Array.from(items)
Array.from(items, mapFn)
Array.from(items, mapFn, thisArg)
items: 要转换为数组的可迭代或类似数组的对象。
mapFn:调用数组每个元素的函数。然后将 mapFn 的返回值添加到数组中
thisArg:this 值

返回一个新的一个新的 Array 实例。

```js
console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
```

### Array.fromAsync（） 静态方法从异步可迭代对象、可迭代对象或类似数组对象创建一个新的浅层复制 Array 实例。

```js
const result = [];
for await (const element of items) {
  result.push(element);
}
```

### Array.isArray（） 静态方法确定传递的值是否为数组 。

### Array.of（） 静态方法创建一个新的数组 实例来自可变数量的参数，无论 参数。

```js
console.log(Array.of('foo', 2, 'bar', true));
// Expected output: Array ["foo", 2, "bar", true]

console.log(Array.of());
// Expected output: Array []
```

### Array[Symbol.species] 静态访问器属性返回用于从数组方法构造返回值的构造函数。

## 原型方法

### at（）采用整数值并返回该索引处的项目，允许正整数和负整数。负整数从数组中的最后一项开始倒数。

```js
const array = [5, 12, 8, 130, 44];

let index = 2;

console.log(`An index of ${index} returns ${array.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${array.at(index)}`);
// Expected output: "An index of -2 returns 130"
```

### concat（） 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

### copyWithin（） 方法将此数组的一部分浅层复制到同一数组中的另一个位置，并在不修改其长度的情况下返回此数组。

copyWithin(target, start)
copyWithin(target, start, end)
target：将序列复制到的从零开始的索引， 转换为整数 。这对应于开始时的元素将被复制到的位置，并且开始和结束之间的所有元素都将复制到后续索引。
如果目标 < -array.length，则使用 0。
如果目标 >= array.length，则不复制任何内容。
如果目标在归一化后启动后定位，则复制只发生到 array.length 结束（换句话说，copyWithin（） 永远不会扩展数组）。

```js
const array = ['a', 'b', 'c', 'd', 'e'];
// 从索引3到索引4结束的元素复制到索引0的位置上
console.log(array.copyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// 复制到索引1 所有元素从索引3开始到结束
console.log(array.copyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]
```

### entries（） 方法返回一个新的数组迭代器对象，其中包含数组中每个索引的键/值对。

```js
const array = ['a', 'b', 'c'];

const iterator = array.entries();

console.log(iterator.next().value);
// Expected output: Array [0, "a"]

console.log(iterator.next().value);
// Expected output: Array [1, "b"]
```

### every（） 方法测试数组中的所有元素是否都通过了提供的函数实现的测试。它返回一个布尔值。

```js
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true
```

### some（） 方法测试数组中至少有一个元素是否通过了由提供的函数实现的测试。如果在数组中找到所提供函数返回 true 的元素，则返回 true;否则，它返回 false。它不会修改数组。

### fill（） 方法将数组中索引范围内的所有元素更改为静态值。它返回修改后的数组。

fill(value)
fill(value, start)
fill(value, start, end)

```js
const array = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(array.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

// Fill with 5 from position 1
console.log(array.fill(5, 1));
// Expected output: Array [1, 5, 5, 5]

console.log(array.fill(6));
// Expected output: Array [6, 6, 6, 6]
```

### filter（） 方法创建给定数组的一部分的浅层副本 ，过滤到给定数组中通过所提供函数实现的测试的元素。

```js
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
```

### find（） 方法返回所提供数组中满足所提供测试函数的第一个元素。如果没有值满足测试函数，则返回 undefined。

### findIndex（） 方法返回数组中满足所提供测试函数的第一个元素的索引。如果没有元素满足测试函数，则返回 -1。

### findLast（） 方法以相反的顺序迭代数组，并返回满足所提供测试函数的第一个元素的值。如果没有元素满足测试函数，则返回 undefined。

### findLastIndex（） 方法以相反的顺序迭代数组，并返回满足所提供测试函数的第一个元素的索引。如果没有元素满足测试函数，则返回 -1。

### flat（） 方法创建一个新数组，其中所有子数组元素递归地连接到其中，直至指定深度。

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: Array [0, 1, 2, 3, 4]

const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]
```

### flatMap（） 方法返回一个新数组，该数组是通过将给定的回调函数应用于数组的每个元素，然后将结果扁平化一级而形成的。它与 map（） 后跟深度为 1 的 flat（） 相同 （arr.map（...args）.flat（）），但比单独调用这两个方法稍微高效一些。

```js
const arr = [1, 2, 1];

const result = arr.flatMap((num) => (num === 2 ? [2, 2] : 1));

console.log(result);
// Expected output: Array [1, 2, 2, 1]
```

### forEach（） 方法为每个数组元素执行一次提供的函数。

### includes（） 方法确定数组是否在其条目中包含某个值，返回 true 或 false 视情况而定。

### indexOf（） 方法返回可以在数组中找到给定元素的第一个索引，如果不存在，则返回 -1。

### join（） 方法通过连接此数组中的所有元素（用逗号或指定的分隔符字符串分隔）来创建并返回一个新字符串。如果数组只有一个项目，则将在不使用分隔符的情况下返回该项目。

```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"
```

### keys（） 方法返回一个新的数组迭代器对象，其中包含数组中每个索引的键。

```js
const array = ['a', 'b', 'c'];
const iterator = array.keys();

for (const key of iterator) {
  console.log(key);
}

// Expected output: 0
// Expected output: 1
// Expected output: 2
```

### lastIndexOf（） 方法返回可以在数组中找到给定元素的最后一个索引，如果不存在，则返回 -1。向后搜索数组，从 fromIndex 开始。

### map（） 方法创建一个新数组，其中填充了在调用数组中的每个元素上调用提供的函数的结果。

### pop（） 方法删除最后一个 元素，并返回该元素。此方法更改了 数组。

### push（） 方法将指定的元素添加到数组的末尾，并返回数组的新长度。

push()
push(element1)
push(element1, element2)
push(element1, element2, /_ …, _/ elementN)

### reduce（） 方法按顺序对数组的每个元素执行用户提供的“reducer”回调函数，并传入前一个元素计算的返回值。在数组的所有元素上运行 reducer 的最终结果是单个值。

第一次运行回调时，没有“上一个计算的返回值”。如果提供，则可以使用初始值来代替它。否则，索引 0 处的数组元素将用作初始值，迭代从下一个元素（索引 1 而不是索引 0）开始

```js
const array = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
```

### reduceRight（） 方法对累加器和数组的每个值（从右到左）应用一个函数，以将其减少为单个值。

```js
const array = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const result = array.reduceRight((accumulator, currentValue) =>
  accumulator.concat(currentValue),
);

console.log(result);
// Expected output: Array [4, 5, 2, 3, 0, 1]
```

### reverse（） 方法就地反转数组并返回对同一数组的引用，第一个数组元素现在成为最后一个，最后一个数组元素成为第一个。换句话说，数组中的元素顺序将转向与前面所述相反的方向。

### toReversed（） 方法是 reverse（） 方法的复制对应物。它返回一个新数组，其中包含相反顺序的元素。

```js
const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]
```

### shift（） 方法删除了第一个 元素，并返回该删除的元素。此方法更改长度 数组的。

### slice（） 方法将数组的一部分的浅层副本返回到从头到尾选择的新数组对象中 （end 不包括）其中 start 和 end 表示该数组中项目的索引。原始数组不会被修改。

slice()
slice(start)
slice(start, end)

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

### sort（） 方法对数组的元素进行排序，并返回对同一数组的引用，现在已排序。默认排序顺序是升序，建立在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列的基础上

sort()
sort(compareFn)
a:第一个比较元素。永远不会 undefined
b:第二个要素进行比较。永远不会 undefined
返回值（顺序排序）
负值表示 a 应该在 b 之前
正值表示 a 应该在 b 之后。
零或 NaN 表示 a 和 b 被认为是相等的。
请记住 （a， b） => a - b 按升序对数字进行排序
如果省略，数组元素将转换为字符串，然后根据每个字符的 Unicode 代码点值进行排序。

```js
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

const array = [1, 30, 4, 21, 100000];
array.sort();
console.log(array);
// Expected output: Array [1, 100000, 21, 30, 4]
```

### toSorted（） 方法是 sort（） 方法的复制版本。它返回一个新数组，其中包含按升序排序的元素。

### splice（） 方法通过删除或替换现有元素和/或就地添加新元素来更改数组的内容。

splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2)
splice(start, deleteCount, item1, item2, /_ …, _/ itemN)

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

### toSpliced（） 方法是 splice（） 方法的复制版本。它返回一个新数组，其中某些元素在给定索引处被删除和/或替换。

### Array 实例的 toLocaleString（） 方法返回一个字符串，表示 数组的元素。这些元素使用其 toLocaleString 方法，这些字符串由特定于区域设置的字符串（例如逗号“，”）分隔。

```js
const array = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
const localeString = array.toLocaleString('en', { timeZone: 'UTC' });

console.log(localeString);
// Expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```

### toString（） 方法返回一个表示指定数组及其元素的字符串。

### unshift（） 方法将指定的元素添加到数组的开头并返回数组的新长度。

```js
const array = [1, 2, 3];

console.log(array.unshift(4, 5));
// Expected output: 5

console.log(array);
// Expected output: Array [4, 5, 1, 2, 3]
```

### values（） 方法返回一个新的数组迭代器对象，该对象迭代数组中每个项目的值。

```js
const array = ['a', 'b', 'c'];
const iterator = array.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

### with（） 方法是使用括号表示法更改给定索引值的复制版本。它返回一个新数组，其中给定索引处的元素替换为给定值。

arrayInstance.with(index, value)

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

with（） 方法总是创建一个密集数组。

```js
const arr = [1, , 3, 4, , 6];
console.log(arr.with(0, 2)); // [2, undefined, 3, 4, undefined, 6]
```

在非数组对象上调用 with（）
with（） 方法创建并返回一个新数组。它读取 this 的 length 属性，然后访问其键是小于 length 的非负整数的每个属性。当访问此属性的每个属性时，具有等于属性键的索引的数组元素将设置为属性的值。最后， 索引处的数组值设置为值 。

```js
const arrayLike = {
  length: 3,
  unrelated: 'foo',
  0: 5,
  2: 4,
  3: 3, // ignored by with() since length is 3
};
console.log(Array.prototype.with.call(arrayLike, 0, 1));
// [ 1, undefined, 4 ]
```

### [Symbol.iterator]()

[Symbol.iterator]（） 方法实现了可迭代协议 ，并允许大多数期望可迭代的语法使用数组，例如扩展语法和 for...of 的循环。它返回一个数组迭代器对象 ，该对象产生数组中每个索引的值。

```js
const array = ['a', 'b', 'c'];
const iterator = array[Symbol.iterator]();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

# ArrayBuffer 对象用于表示通用原始二进制数据缓冲区。

它是一个字节数组，在其他语言中通常称为“字节数组”。您无法直接作 ArrayBuffer 的内容;相反，您可以创建一个类型化数组对象或以特定格式表示缓冲区的 DataView 对象，并使用它来读取和写入缓冲区的内容。

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(8);

console.log(buffer.byteLength);
// Expected output: 8
```

## 静态方法

ArrayBuffer.isView（） 静态方法确定传递的值是否是 ArrayBuffer 视图之一，例如类型化数组对象 或 DataView。

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

console.log(ArrayBuffer.isView(new Int32Array()));
// Expected output: true
```

ArrayBuffer[Symbol.species] 静态访问器属性返回用于构造数组缓冲区方法返回值的构造函数。

## 原型对象

### resize（） 方法将 ArrayBuffer 的大小调整为指定的大小（以字节为单位）

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(buffer.byteLength);
// Expected output: 8

buffer.resize(12);

console.log(buffer.byteLength);
// Expected output: 12
```

### slice（） 方法返回一个新的 ArrayBuffer，其内容是该 ArrayBuffer 字节从开始 、包括、到结束 、排他字节的副本。如果 start 或 end 为负数，则它引用数组末尾的索引，而不是从开头开始的索引。

slice()
slice(start)
slice(start, end)

```js
// Create an ArrayBuffer with a size in bytes

const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);
// Produces Int32Array [0, 0, 0, 0]

int32View[1] = 42;
const sliced = new Int32Array(buffer.slice(4, 12));
// Produces Int32Array [42, 0]

console.log(sliced[0]);
// Expected output: 42
```

### transfer（） 方法创建一个与此缓冲区具有相同字节内容的新 ArrayBuffer，然后分离此缓冲区。

transfer()
transfer(newByteLength)

### ArrayBuffer 实例的 transferToFixedLength（） 方法创建一个新的不可调整大小的 ArrayBuffer，其字节内容与此缓冲区相同，然后分离此缓冲区。

transferToFixedLength()
transferToFixedLength(newByteLength)

### byteLength 访问器属性返回此数组缓冲区的长度（以字节为单位）。

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(8);

// Use byteLength to check the size
const bytes = buffer.byteLength;

console.log(bytes);
// Expected output: 8
```

### detached 返回一个布尔值，指示此缓冲区是否已分离（传输）。

```js
const buffer = new ArrayBuffer(8);
console.log(buffer.detached); // false
const newBuffer = buffer.transfer();
console.log(buffer.detached); // true
console.log(newBuffer.detached); // false
```

### maxByteLength 访问器属性返回此数组缓冲区可以调整到的最大长度（以字节为单位）。

```js
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });

console.log(buffer.byteLength);
// Expected output: 8

console.log(buffer.maxByteLength);
// Expected output: 16
```

### resizable 属性返回是否可以调整此数组缓冲区的大小。

```js
const buffer1 = new ArrayBuffer(8, { maxByteLength: 16 });
const buffer2 = new ArrayBuffer(8);

console.log(buffer1.resizable);
// Expected output: true

console.log(buffer2.resizable);
// Expected output: false
```

# AsyncFunction()

请注意，AsyncFunction 不是全局对象。可以通过以下代码获得：

```js
const AsyncFunction = async function () {}.constructor;
```

new AsyncFunction(functionBody)
new AsyncFunction(arg1, functionBody)
new AsyncFunction(arg1, arg2, functionBody)
new AsyncFunction(arg1, arg2, /_ …, _/ argN, functionBody)

AsyncFunction(functionBody)
AsyncFunction(arg1, functionBody)
AsyncFunction(arg1, arg2, functionBody)
AsyncFunction(arg1, arg2, /_ …, _/ argN, functionBody)

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

const AsyncFunction = async function () {}.constructor;

const fn = new AsyncFunction(
  'a',
  'b',
  'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);',
);

fn(10, 20).then((v) => {
  console.log(v); // prints 30 after 4 seconds
});
```

# AsyncGenerator

AsyncGenerator 对象由异步生成器函数返回，它同时符合异步可迭代协议和异步迭代器协议 。
异步生成器方法总是产生 Promise 对象

```js
async function* createAsyncGenerator() {
  yield Promise.resolve(1);
  yield await Promise.resolve(2);
  yield 3;
}
const asyncGen = createAsyncGenerator();
asyncGen.next().then((res) => console.log(res.value)); // 1
asyncGen.next().then((res) => console.log(res.value)); // 2
asyncGen.next().then((res) => console.log(res.value)); // 3
```

```js
// An async task. Pretend it's doing something more useful
// in practice.
function delayedValue(time, value) {
  return new Promise((resolve /*, reject */) => {
    setTimeout(() => resolve(value), time);
  });
}

async function* generate() {
  yield delayedValue(2000, 1);
  yield delayedValue(1000, 2);
  yield delayedValue(500, 3);
  yield delayedValue(250, 4);
  yield delayedValue(125, 5);
  yield delayedValue(50, 6);
  console.log('All done!');
}

async function main() {
  for await (const value of generate()) {
    console.log('value', value);
  }
}

main().catch((e) => console.error(e));
```

# AsyncGeneratorFunction

AsyncGeneratorFunction 对象为异步生成器函数提供方法。在 JavaScript 中，每个异步生成器函数实际上都是一个 AsyncGeneratorFunction 对象。
请注意，AsyncGeneratorFunction 不是全局对象。可以通过以下代码获得：

```js
const AsyncGeneratorFunction = async function* () {}.constructor;
```

```js
const AsyncGeneratorFunction = async function* () {}.constructor;

const foo = new AsyncGeneratorFunction(`
  yield await Promise.resolve('a');
  yield await Promise.resolve('b');
  yield await Promise.resolve('c');
`);

let str = '';

async function generate() {
  for await (const val of foo()) {
    str += val;
  }
  console.log(str);
}

generate();
// Expected output: "abc"
```

# proxy

```js
const target = {
  message1: 'hello',
  message2: 'everyone',
};

const handler1 = {};

const proxy1 = new Proxy(target, handler1);
```

```js
const target = {
  message1: 'hello',
  message2: 'everyone',
};

const handler2 = {
  get(target, prop, receiver) {
    return 'world';
  },
};

const proxy2 = new Proxy(target, handler2);

const target = {
  message1: 'hello',
  message2: 'everyone',
};

const handler3 = {
  get(target, prop, receiver) {
    if (prop === 'message2') {
      return 'world';
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```
