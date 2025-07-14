const {
  isMainThread,
  parentPort,
  workerData,
  threadId

} = require("worker_threads")
const name = `线程${threadId}`
const isPrime = require("./isPrime")
const newArr = []
for (const n of workerData) {
  if (!isPrime(n)) {
    newArr.push(n)
  }
}
console.log(name + "-已完成")
parentPort.postMessage(newArr)

// const arr = require("./number.json")
// // for (let index = 0; index < 1000; index++) {
// //   arr.push(Math.floor(Math.random() * 100000000))
// // }
// console.time()
// // const fs = require("fs")
// // fs.writeFile("./number.json", JSON.stringify(arr), () => {

// // })
// const newArr = []
// for (const n of arr) {
// if (!isPrime(n)) {
//   newArr.push(n)
// }
// }
// console.timeEnd()
// console.log(newArr)
