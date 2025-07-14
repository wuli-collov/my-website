# 监听图表容器的大小并改变图表大小

```js
var myChart = echarts.init(document.getElementById('main'));
window.addEventListener('resize', function () {
  myChart.resize();
});
// 为图表设置特定的大小
myChart.resize({
  width: 800,
  height: 400,
});
```

# 容器节点被销毁以及被重建时

假设页面中存在多个标签页，每个标签页都包含一些图表。当选中一个标签页的时候，其他标签页的内容在 DOM 中被移除了。这样，当用户再选中这些标签页的时候，就会发现图表“不见”了。

本质上，这是由于图表的容器节点被移除导致的。即使之后该节点被重新添加，图表所在的节点也已经不存在了。

正确的做法是，在图表容器被销毁之后，调用 echartsInstance.dispose 销毁实例，在图表容器重新被添加后再次调用 echarts.init 初始化。

需要 echartsInstance.dispose 销毁实例
：在容器节点被销毁时，总是应调用 echartsInstance.dispose 以销毁实例释放资源，避免内存泄漏

## 样式

最简单的更改全局样式的方式，是直接采用颜色主题（theme）。例如，在 示例集合 中，可以通过切换深色模式，直接看到采用主题的效果。

ECharts5 除了一贯的默认主题外，还内置了'dark'主题。可以像这样切换成深色模式：

var chart = echarts.init(dom, 'dark');
