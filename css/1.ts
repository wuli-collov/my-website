function sum(a: number, b: number) {
    return a + b
}
declare function debounce<T extends any[]>(fn: (...args: T) => any, delay: number): (...args: T) => void

const dSum = debounce(sum, 1000)
console.log(dSum)