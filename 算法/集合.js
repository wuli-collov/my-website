// // // class MySet {
// // //   constructor() {
// // //     this.items = {}
// // //   }
// // //   add(item) {
// // //     if (!this.has(item)) {
// // //       this.items[item] = item
// // //       return true
// // //     }
// // //     return false
// // //   }
// // //   delete(item) {
// // //     if (this.has(item)) {
// // //       delete this.items[item]
// // //       return true
// // //     }
// // //     return false
// // //   }
// // //   has(item) {
// // //     return Object.prototype.hasOwnProperty.call(this.items, item)

// // //   }
// // //   clear() {
// // //     this.items = []
// // //   }
// // //   size() {
// // //     return Object.keys(this.items).length
// // //   }
// // //   values() {
// // //     return Object.values(this.items)
// // //   }
// // // }

// // // const mySet = new MySet()
// // // mySet.add(1)
// // // mySet.add(2)
// // // console.log(mySet.size())

// // // const s1 = new Set([1, 2, 3])
// // // const s2 = new Set([3, 4, 5])
// // // // 并集 12345
// // // const bj = new Set([...s1, ...s2])
// // // // 交集 3
// // // const jj = new Set([...s1].filter(x => s2.has(x)))
// // // // 差集 1,2,4,5
// // // const cj = new Set([...[...s1].filter(x => !s2.has(x))])
// // // // 子集 验证一个集合是否是另外一个的子集
// // // const s3 = new Set([1, 2, 3])
// // // const s4 = new Set([1, 2, 3, 4, 5])
// // // const isZj = [...s3].every(e => s4.has(e))
// // // console.log(isZj)

// // class MyMap {

// //   constructor() {
// //     this.items = []
// //   }
// //   set(key, value) {

// //   }
// //   remove(key) {

// //   }
// //   hasKey(key) {
// //     return Object.keys(this.items).includes(key)
// //   }
// //   get(key) {

// //   }
// //   clear() {

// //   }
// //   size() {

// //   }
// //   isEmpty() {

// //   }
// //   keys() {

// //   }
// //   values() {

// //   }
// //   keyValues() {

// //   }
// //   forEach(callbackFn) {

// //   }
// // }

// class MyTree {
//   constructor() {
//     this.roots = []
//   }
//   add() {
//     this.roots
//   }

// }

// class TreeNode {
//   constructor(value) {
//     this.value = value //值
//     this.left = null //左子树
//     this.right = null //右子树
//   }
// }
// const root = new TreeNode("A");
// root.left = new TreeNode("B");
// root.right = new TreeNode("C");
// root.left.left = new TreeNode("D");
// root.left.right = new TreeNode("E");
// root.left.left.left = new TreeNode("H");
// root.left.left.right = new TreeNode("I");
// root.left.right.left = new TreeNode("J");
// root.left.right.right = new TreeNode("K");
// root.right.left = new TreeNode("F");
// root.right.right = new TreeNode("G");
// root.right.left.left = new TreeNode("L");
// root.right.left.right = new TreeNode("M");
// root.right.right.left = new TreeNode("N");
// root.right.right.right = new TreeNode("O");
// // 前序排序
// function preOrder(root) {
//   if (root === null) return
//   //访问跟节点
//   console.log(root.value)
//   //   遍历左子树
//   preOrder(root.left)
//   //   遍历右子树
//   preOrder(root.right)
// }
// //中序排序
// function inOrder(root) {
//   if (root === null) return
//   //   遍历左子树
//   inOrder(root.left)
//   //   遍历右子树
//   inOrder(root.right)
//   //访问跟节点
//   console.log(root.value)
// }
// // 后序排序
// function postOrder(root) {
//   if (root === null) return
//   //   遍历左子树
//   postOrder(root.left)
//   //   遍历右子树
//   postOrder(root.right)
//   //访问跟节点
//   console.log(root.value)
// }
// // dbeafcg
// //  
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// 前序序列 跟节点-》左节点-》右节点
const preOrderList = ["A", "B", "D", "E", "C", "F", "G"];
// 中序序列 左节点-》跟节点-》右节点
const inOrderList = ["D", "B", "E", "A", "F", "C", "G"];
// 后序序列 左节点-》右节点-》跟节点
const postOrderList = ["D", "E", "B", "F", "G", "C", "A"];


function buidTree(preOrderList, inOrderList) {
  if (!preOrderList.length || !inOrderList.length) {
    return null
  }
  if (preOrderList.length !== inOrderList.length) {
    return null
  }
  //   const mid = Math.floor(inOrderList.length / 2)
  //   const left = inOrderList[0, mid]
  //   const right = inOrderList[mid, inOrderList.length]

  const rootValue = preOrderList[0]
  const root = new TreeNode(rootValue)
  console.log(rootValue)
  if (preOrderList.length === 1) {
    return root
  }
  //   在中序序列找那个寻找跟节点所在的位置
  const rootIndex = inOrderList.indexOf(rootValue)
  if (rootIndex === -1) {
    throw new Error(`值为${rootValue}在中序列找不到`)
  }
  const leftInOrderList = inOrderList.slice(0, rootIndex)
  const rightInOrderList = inOrderList.slice(rootIndex + 1)
  const leftTreeSize = leftInOrderList.length

  const leftPreOrderList = preOrderList.slice(1, 1 + leftTreeSize)
  const rightPreOrderList = preOrderList.slice(1 + leftTreeSize)
  root.left = buidTree(leftPreOrderList, leftInOrderList)
  root.right = buidTree(rightPreOrderList, rightInOrderList)
  return root
}


function buildPostTree(postOrderList, inOrderList) {
  // 如果后序序列或者中序序列为空，说明无法构建
  if (!postOrderList.length || !inOrderList.length) return null;

  // 如果两者长度不相等，也无法构建
  if (postOrderList.length !== inOrderList.length) {
    throw new Error("前序序列和中序序列长度不一致，无法构建");
  }

  // 后序序列的最后一个元素就是当前树的根节点，因为前序遍历的顺序为左子树 -> 右子树 --> 根节点
  const rootValue = postOrderList[postOrderList.length - 1];
  const root = new TreeNode(rootValue); // 创建一个根节点

  // 如果只有一个元素，那么直接返回根节点
  if (postOrderList.length === 1) return root;

  // 在中序序列中寻找根节点所在的位置
  // 中序序列：DBEAFCG
  const rootIndex = inOrderList.indexOf(rootValue);
  if (rootIndex === -1) {
    throw new Error(`值为${rootValue}在中序序列中没有找到，无法构建二叉树`);
  }

  // 上面的到了根节点在中序序列中的下标，可以将中序左边部分和右边部分分离出来
  const leftInOrderList = inOrderList.slice(0, rootIndex); // DBE
  const rightInOrderList = inOrderList.slice(rootIndex + 1); // FCG

  const leftTreeSize = leftInOrderList.length; // 拿到中序序列的左子树的长度
  // 根据这个长度从前序序列中把左子树和右子树分离出来
  const leftPostOrderList = postOrderList.slice(0, leftTreeSize); //BDE
  const rightPostOrderList = postOrderList.slice(leftTreeSize, postOrderList.length - 1); // CFG

  // 到目前为止，我们得到了后序序列的左右子树序列和中序序列的左右子树序列
  // 接下来递归调用 buildTree，将新的后序序列和中序序列传进去
  root.left = buildPostTree(leftPostOrderList, leftInOrderList);
  root.right = buildPostTree(rightPostOrderList, rightInOrderList);

  // 最后返回构建好的二叉树
  return root;
}
const root = buildPostTree(postOrderList, inOrderList)
console.log(root)

function levelOrder(root) {
  if (root === null) return
  const queue = [] //用于存储每一层的节点
  queue.push(root)

  while (queue.length > 0) {
    const node = queue.shift()
    console.log(node.value)
    if (node.left !== null) {
      queue.push(node.left)
    }
    if (node.right !== null) {
      queue.push(node.right)
    }
  }

}

function levelSearch(root, target) {
  if (root === null) return null
  if (root.value === target) return true
  const queue = [] //用于存储每一层的节点
  queue.push(root)
  while (queue.length > 0) {
    const node = queue.shift()
    if (node.value === target) {
      return true
    }
    if (node.left !== null) {
      queue.push(node.left)
    }
    if (node.right !== null) {
      queue.push(node.right)
    }
  }
  return false

}

function compareTree(tree1, tree2) {
  if (tree1 === tree2) return true
  if (tree1 == null || tree2 !== null) return false

  if (tree1.value !== !tree2.value) {
    return false
  }

  const lefresult = compareTree(tree1.left, tree2.left)
  const rightsult = compareTree(tree1.right, tree2.right)
  return lefresult && rightsult

}
