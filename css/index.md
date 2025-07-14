# 概述

---

这个 css 章节主要记录各种各样的动画效果及实现方法原理

# 盒模型

## 标准盒模型

标准盒模型的宽度（width）和高度（height）属性仅包括内容区域（content area）的尺寸。

内容区域的尺寸不包括内边距（padding）、边框（border）和外边距（margin）。
公式：在标准盒模型中，元素的宽度（width）指的是元素内容区域的宽度，不包括边框（border）、填充（padding）和外边距（margin）。换句话说，元素的宽度只包括纯粹的内容宽度。即：
盒子的宽度=width(content)+padding+border

对于标准盒模型，box-sizing 的值为 content-box（默认值）。盒子的宽度为内容的宽度。

## 怪异盒模型：

怪异盒模型是某些浏览器的非标准盒模型。

怪异盒模型的宽度（width）和高度（height）属性包括内容区域（content area）、内边距（padding）和边框（border）的尺寸。

盒子的宽度=width(content+padding+border)

对于怪异盒模型，box-sizing 的值为 border-box。将盒子转为怪异盒模型的计算方式，不会出现因为最初设置好的宽高被内边距撑大的情况。

# 提升为合成层

我们可以通过 createDocumentFragment 创建一个游离于 DOM 树之外的节点，然后在此节点上批量操作，最后插入 DOM 树中，因此只触发一次重排

将元素提升为合成层有以下优点：

合成层的位图，会交由 GPU 合成，比 CPU 处理要快
当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
对于 transform 和 opacity 效果，不会触发 layout 和 paint

#target {
will-change: transform;
}

transform 属于合成属性（composite property），对合成属性进行 transition/animation 动画将会创建一个合成层（composite layer），这使得被动画元素在一个独立的层中进行动画。通常情况下，浏览器会将一个层的内容先绘制进一个位图中，然后再作为纹理（texture）上传到 GPU，只要该层的内容不发生改变，就没必要进行重绘（repaint），浏览器会通过重新复合（recomposite）来形成一个新的帧。

top/left 属于布局属性，该属性的变化会导致重排（reflow/relayout），所谓重排即指对这些节点以及受这些节点影响的其它节点，进行 CSS 计算->布局->重绘过程，浏览器需要为整个层进行重绘并重新上传到 GPU，造成了极大的性能开销。
