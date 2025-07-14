# 图像处理技术讲解

## 什么问题

在线处理图片的时候，会涉及到**复杂**的操作：

- 添加图片滤镜：高斯模糊、锐化、浮雕等效果
- 图片变换：需要改变**图像本身**，而非仅仅改变显示方式。
- 图片压缩
- 图片拼接
- ....

遇到这样的需求的时候，就需要 **专业的图像处理库** 来进行处理。

问题：使用这些图像处理库来进行处理的时候，经常会遇到**卡顿、耗时**的问题。

原因：图像处理库里面的算法涉及到大量的数学运算，这是**计算密集型任务**。JS 本身不擅长处理计算密集型任务，因为 **JS 是单线程**的，在主线程上面执行计算密集型任务，会阻塞其他操作，特别是用户交互相关的操作一旦被阻塞，给人的感觉就是卡顿。

## 解决思路

- 服务器端来解决：服务器端可以使用支持多线程的语言来进行处理，但是这里涉及到网络通信，这又是一个不确定因素。
- 客户端段来解决：
  - 使用 Web Wokrer
  - 使用 WebAssembly
  - 优化算法（不做考虑）

综合思考下来，考虑前面两个 Web Worker 和 WebAssembly 结合起来，提升图像处理性能。

## 技术细节

**1. WebAssembly**

WebAssembly 是**二进制格式**，它**接近于机器码**，运行时性能接近于原生代码。

**WebAssembly 可以与 JavaScript 互操作**，允许开发者在网页中使用其他语言（如 C/C++、Rust）编写和性能相关的关键的代码，并将其**编译成 WebAssembly 模块**，以显著提高计算密集型任务（如图像处理）的性能。

**2. 将图像算法迁移WebAssembly里面**

这里可以借助 **Emscripten**，这是一个内置了 LLVM 工具链**编译器**，这个编译器就可以将 **C/C++ 代码**编译为 **WebAssembly**

这里选择将 C/C++ 知名的图像处理库 **OpenCV**，借助 Emscripten 将其编译为 WebAssembly

OpenCV 的一个示例代码：

```c++
// 一个简单的 C++ 图像处理函数，比如将图像转换为灰度图。
#include <cstdint>

extern "C" {
  void grayscale(uint8_t* image, int width, int height) {
     for (int y = 0; y < height; ++y) {
         for (int x = 0; x < width; ++x) {
             int index = (y * width + x) * 4;
             uint8_t r = image[index];
             uint8_t g = image[index + 1];
             uint8_t b = image[index + 2];
             uint8_t gray = 0.299 * r + 0.587 * g + 0.114 * b;
             image[index] = gray;
             image[index + 1] = gray;
             image[index + 2] = gray;
         }
     }
  }
}
```

使用 Emscripten 进行编译：

```bash
emcc image_processing.cpp -O3 -s WASM=1 -s MODULARIZE=1 -s 'EXPORT_NAME="createWasmModule"' -o image_processing.js
```

编译后会生成 WebAssembly 模块，这个模块由两个部分组成：

- 二进制格式的 .wasm 文件
- 一个 js 文件，这个 js 文件是一个胶水代码

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2024-06-11-090958.png" alt="image-20240611170957893" style="zoom: 65%;" />

编译完成后，就可以动态的在 JS 中加载 WebAssembly 模块：

```js
// index.js
async function loadWasmModule() {
  // 动态加载 Wasm 模块的胶水代码
  const module = await import('./image_processing.js');
  return module();
}

async function processImage(imageData) {
  const wasmModule = await loadWasmModule();
  // 调用 Wasm 模块里面的方法，这个其实就是 opencv 图像处理库所提供的图像算法
  const grayscale = wasmModule.cwrap('grayscale', null, ['number', 'number', 'number']);

  const width = imageData.width;
  const height = imageData.height;
  const data = new Uint8Array(imageData.data.buffer);

  // 使用 Wasm 模块处理图像
  grayscale(data.byteOffset, width, height);

  // 更新图像数据
  imageData.data.set(data);
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'path/to/image.jpg';
img.onload = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  processImage(imageData).then(() => {
     ctx.putImageData(imageData, 0, 0);
  });
};
```

**3. 使用 Web Wokrer做进一步的优化**

Web Worker 允许在**主线程之外**运行脚本，以避免阻塞用户界面。在图像处理过程中，**可以将计算密集型任务放到 Web Worker 中执行**。通过 postMessage 方法，可以将图像数据传递给 Web Worker 进行处理，处理完成后再将结果返回主线程，从而避免页面卡顿，提高用户体验。

具体的步骤如下：

1. 创建 Web Worker 并传递图像数据
2. 在 Web Worker 中调用 WebAssembly 模块提供的图像处理算法来对图像进行处理
3. 将处理完后的图像数据传回给主线程并且更新 Canvas

**4. 使用 OffscreenCanvas 再一次进行优化**

OffscreenCanvas 允许在**主线程之外**的工作线程**绘制图像**。

使用了 OffscreenCanvas 之后，就不需要将处理后的图像数据传回主线程，因为 OffscreenCanvas 已经包含了绘制内容，可以自动更新主线程的显示。

示例代码：

```js
// 主线程代码
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');

// 将 OffscreenCanvas 传递给 Web Worker
worker.postMessage({ canvas: offscreen }, [offscreen]);

// 加载图像并发送给 Worker 进行处理
const img = new Image();
img.src = 'path/to/image.jpg';
img.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    worker.postMessage({ imageData });
};
```

```js
// worker.js
self.onmessage = async (event) => {
    const { canvas, action } = event.data;

    if (action === 'processImage' && canvas) {
        const ctx = canvas.getContext('2d');

        // 加载和初始化 Wasm 模块
        const module = await import('./image_processing.js');
        const wasmModule = await module();
        const grayscale = wasmModule.cwrap('grayscale', null, ['number', 'number', 'number']);

        // 获取图像数据进行处理
        const width = canvas.width;
        const height = canvas.height;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = new Uint8Array(imageData.data.buffer);

        // 调用 Wasm 函数处理图像数据
        grayscale(data.byteOffset, width, height);

        // 将处理后的图像数据放回 Canvas
        imageData.data.set(data);
        ctx.putImageData(imageData, 0, 0);

        // 不需要将处理后的图像数据传回主线程，OffscreenCanvas 已经包含了绘制内容
    }
};
```

**5. 使用requestIdleCallback来优化数据的传递**

requestIdleCallback 方法允许浏览器在**空闲时间**执行低优先级任务。在图像处理过程中，可以利用 requestIdleCallback 方法优化**数据传递**和**其他非紧急操作**。例如，当用户在进行滚动、点击等操作（紧急操作）时，这些操作会被优先处理，图像处理任务中涉及到的大量数据传递，会在浏览器空闲时进行，确保界面响应迅速。

示例代码：

```js
// 主线程代码
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');

// 将 OffscreenCanvas 传递给 Web Worker
worker.postMessage({ canvas: offscreen }, [offscreen]);

// 加载图像并发送给 Worker 进行处理
const img = new Image();
img.src = 'path/to/image.jpg';
img.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // 使用 requestIdleCallback 优化数据传递
    requestIdleCallback(() => {
        worker.postMessage({ action: 'processImage', imageData });
    });
};
```

最后来整理一下整体的流程：

1. 在主线程中使用 requestIdleCallback **调度图像处理任务**，确保在浏览器空闲时间执行任务，从而不阻塞用户界面响应。 
2. 将图像处理任务放到 Web Worker 中，利用 OffscreenCanvas 和 WebAssembly 进行高效的工作线程处理。 
3. 处理完成后，直接在 OffscreenCanvas 上绘制处理后的图像，无需将图像数据传回主线程，OffscreenCanvas 会自动更新主线程中的显示。

---

-EOF-
