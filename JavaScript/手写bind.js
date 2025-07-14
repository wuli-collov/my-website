function fn(a, b, c, d) {
  console.log('fn called')
  console.log('args', a, b, c, d)
  console.log('this', this)

}
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this
  return function (...args2) {
    const allArgs = [...args, ...args2]
    if (new.target) {
      return new fn(...allArgs)
    } else {
      return fn.call(ctx, ...allArgs)
    }

  }

}
Function.prototype.myCall = function (ctx, ...args) {
  const content = Object(ctx) || globalThis
  const fn = Symbol()
  content[fn] = this
  Object.defineProperty(content, fn, {
    enumerable: false
  });
  content[fn](...args)
}
Function.prototype.myApply = function (ctx, args) {
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object")
  }
  const content = Object(ctx) || globalThis
  const fn = Symbol()
  content[fn] = this
  Object.defineProperty(content, fn, {
    enumerable: false
  });
  content[fn](...args)
}
fn.apply('ctx', [1])
console.log('------------')
fn.myApply('ctx', [1])
// console.log(obj)

// 手写call函数
