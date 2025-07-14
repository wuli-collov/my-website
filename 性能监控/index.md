Navigator.sendBeacon()
方法可用于通过 HTTP POST 将少量数据 异步 传输到 Web 服务器。

PerformanceObserver
PerformanceObserver 用于监测性能度量事件，在浏览器的性能时间轴记录新的 performance entry 的时候将会被通知。

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
    console.log('FCP candidate:', entry.startTime, entry);
  }
}).observe({ type: 'paint', buffered: true });
```
