# Markdown使用

## 1.标题格式
标题格式 标题格式有好几种写法
  
  1. 第一种，用#键开头 空格 然后跟标题内容
  
  前面带#号，后面带文字，分别表示h1-h6,上图可以看出，只到h6，而且h1下面会有一条横线，注意，#号后面有空格 

  2. 另一种表示方法只能写两级标题

  一级标题用========（两个放在两行，效果如下）

  二级标题用 -------（同理）

  3. 第三种表示方法：这个是闭合的符号

    # 一级标题？#
  
    ## 二级标题？##

    ### 三级标题？###


## 2.列表
列表分为有序列表和无序列表。

1. 有序列表就是直接前面写数字+空格写内容就可以了
2. 无序列表可以用“*”，“+”， “-”来作为格式符号。可以混合使用,效果如下
* 1
+ 2
- 3

## 3.引用和代码块
如果想要标注出某段内容是引用摘抄等，可以添加引用格式符 >
如果想在其中插入代码块，则使用符号``````进行标记，其中三引号但独占一行。
> 引用111111
>> 引用22222
>>> 引用33333

```
//（可以写代码语言）在```添加语言
这个是个代码块
```

## 4.分割线
有***** ___ ----------，至少三个，有空格也可以。

*********
 ___
 ----------

## 5.链接
有两种方式，行内式和参数式。
行内式的链接格式是：链接的文字放在[]中，链接地址放在随后的()中
[这个是链接名](/Markdown/use.md#_5-链接)

## 6.图片
图片也有两种表现方式，分别是行内式和参数式。和插入链接的方式几乎一样，只是在方括号前面加了一个!
替代文本

其中，替代文本：用于描述图片的文字，当图片无法显示时，会显示这段文本。
其中， 图片链接：指向图片的URL或本地路径。
如果你想插入一张网络上的图片，可以这样写：
![图片失败了](http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280)
如果你想插入一张存储在本地的图片，比如在同一目录下的 image.png，可以把图片链接换成./我的图片.png
![图片失败了](./我的图片.png)

**注意事项**
___

 - 确保图片链接有效，否则图片不会显示。
 - 在本地使用时，确保文件路径正确。

## 6.表格
在Markdown中创建表格的基本格式如下：

| 列1 | 列2 | 列3 |
|:---:|:---|-------|
| 行1-1 | 行1-2 | 行1-3 |
| 行2-1 | 行2-2 | 行2-3 |

![表格创建](./images/%20table.png)


**说明**

-------
第一行是表头，用 | 分隔不同的列。
第二行使用 - 来定义每一列的对齐方式，至少要有三个 -。可以在 : 的左边或右边添加空格来调整对齐：
- :--- 表示左对齐
+ :---: 表示居中对齐
+ ---: 表示右对齐

| 名字 | 年龄 |
| --- | ---|
| 小明 |19|
| 阿豪 | 33 |


## 7. 强调转义删除线
在Markdown中，强调、转义和删除线的表示方式如下：

**1. 强调**
- 斜体：用单个星号或下划线包围文本。<br>
 示例：\*斜体\* 或 \_斜体\_ （两个*号包裹或者两_包裹）
- 粗体：用两个星号或下划线包围文本。<br>
- 示例：\*\*粗体** 或 \_\_粗体__（4个*号包裹或者4_包裹）
- 粗斜体：用三个星号或下划线包围文本。<br>
- 示例：\*\*\*粗斜体*** 或 \_\_\_粗斜体___（6个*号包裹或者6_包裹）

**2. 转义**
要在Markdown中插入特殊字符，可以使用反斜杠 \ 进行转义。

**3.删除线**

使用两个波浪线包围文本。\~~删除线~~
~~删除线~~

## 代码块中聚焦
在某一行上添加 \/\/ \[\!code focus\] 注释将聚焦它并模糊代码的其他部分。

此外，可以使用 \/\/ \[\!code focus:\<lines\>\] 定义要聚焦的行数。
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

在某一行添加 // \[\!code \-\-\] 或 // \[\!code \++] 注释将会为该行创建 diff，同时保留代码块的颜色。

