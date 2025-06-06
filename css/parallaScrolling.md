# 一、是什么
------
视差滚动（Parallax Scrolling）是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验

我们可以把网页解刨成：背景层、内容层、悬浮层



当滚动鼠标滑轮的时候，各个图层以不同的速度移动，形成视觉差的效果

# 二、实现方式
------
使用css形式实现视觉差滚动效果的方式有：

- background-attachment

   作用是设置背景图像是否固定或者随着页面的其余部分滚动
   值分别有如下：
    - scroll：默认值，背景图像会随着页面其余部分的滚动而移动
    - fixed：当页面的其余部分滚动时，背景图像不会移动
    - inherit：继承父元素background-attachment属性的值

    完成滚动视觉差就需要将background-attachment属性设置为fixed，让背景相对于视口固定。及时一个元素有滚动机制，背景也不会随着元素的内容而滚动
    也就是说，背景一开始就已经被固定在初始的位置
- transform:translate3D
   是CSS3中的一个属性，用于实现3D变换效果。它可以将元素在三个方向上进行平移，即x轴、y轴和z轴。其中，x轴表示水平方向的平移，y轴表示垂直方向的平移，z轴表示深度方向的平移‌

    perspective: css3 属性，当元素涉及 3d 变换时，perspective 可以定义我们眼睛看到的 3d 立体效果，即空间感

    **使用方法**

    transform:translate3d(x, y, z)的具体使用方法如下：
    -  X‌：元素在水平方向上的移动距离。
    -  ‌y‌：元素在垂直方向上的移动距离。
    - ‌ Z‌：元素在深度方向上的移动距离

    ```css
        .element {
            transform: translate3d(100px, 50px, 20px);
        }
    ```
    这段代码会将元素在水平方向上移动100像素，在垂直方向上移动50像素，在深度方向上移动20像素。

    效果展示

    通过设置不同的值，可以实现元素在三维空间中的移动、旋转、缩放等效果。例如：

    - ‌ ‌移动‌：transform: translate3d(100px, 50px, 20px);
    - ‌ ‌旋转‌：transform: rotate3d(1, 0, 0, 45deg);
    - ‌ ‌缩放‌：transform: scale3d(1.5, 1.2, 1);

# 三、代码
------

  **background-attachment:fixed**

  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>background-attachment</title>
    <style>
        div {
            color: #fff;
            line-height: 100vh;
            text-align: center;
            font-size: 20vh;
        }

        .bg1 {
            background-image: url(https://img1.baidu.com/it/u=334181913,3007729167&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800);
            background-attachment: fixed;
            background-size: cover;
            background-position: center center;
        }

        .bg2 {
            background-image: url(https://img2.baidu.com/it/u=3108789787,2392043340&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800);
            background-attachment: scroll;
            background-size: cover;
            background-position: center center;
        }
    </style>
    </head>
    <body>
    <main>
    <div class="bg1">1</div>
    <div class="bg2">2</div>
    </main>
    </body>
    </html>

  ```
