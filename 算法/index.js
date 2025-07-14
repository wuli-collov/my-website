/**
 * 二分查找
 * 冒泡排序
 * 选择排序
 * 插入排序
 * 折半插入排序
 * 希尔排序
 * 归并排序
 * 快速排序
 */
const searchArr = [1, 2, 3, 4, 5]
const arr = [5, 4, 3, 2, 1]
// 二分查找
function binarySearch(target) {
  let left = 0
  let right = searchArr.length
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (target === searchArr[mid]) {
      return mid
    } else if (target > searchArr[mid]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}
// 冒泡排序
function bubleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let swap = false
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap = true;
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
    if (!swap) {
      break
    }
  }
}

// 选择排序
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
    }
  }
}
// 插入排序
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = current
  }
}
// 折半插入排序
function binaryInsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let curent = arr[i]
    let left = 0
    let right = i - 1
    while (left < right) {
      let mid = Math.floor((left + right) / 2)
      if (curent > arr[mid]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    for (let j = i; j > left; j--) {
      arr[j] = arr[j - 1]
    }
    arr[left] = curent
  }

}
// 希尔排序
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2)
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let current = arr[i]
      let j = i
      while (j >= gap && arr[j - gap] > current) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = current
    }
    gap = Math.floor(gap / 2)
  }
}
// 归并排序
function merge(left, right) {
  let result = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex++])
    } else {
      result.push(right[rightIndex++])
    }
  }
  if (leftIndex < left.length) {
    result = result.concat(left.slice(leftIndex))
  } else {
    result = result.concat(right.slice(rightIndex))
  }
  return result
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
// 快速排序
function partition(arr, left, right) {
  let pivot = arr[right]
  let pivotIndex = right
  while (left < right) {
    while (left < right && arr[left] < pivot) {
      left++
    }
    while (left < right && arr[right] >= pivot) {
      right--
    }
    [arr[left], arr[right]] = [arr[right], arr[left]]
  }
  [arr[pivotIndex], arr[left]] = [arr[left], arr[pivotIndex]]
  return left
}

function quikSort(arr) {
  function quikHelper(arr, left, right) {
    if (left < right) {
      const index = partition(arr, left, right)
      quikHelper(arr, left, index - 1)
      quikHelper(arr, index + 1, right)

    }

  }
  quikHelper(arr, 0, arr.length - 1)

}
quikSort(arr)
console.log(arr)
