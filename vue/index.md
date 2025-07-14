vue 在html.css.js的标准上提供了一个基于组件的声明式编程模型
import {createApp,ref} from "vue"
createApp({
    setup(){
        return {
            count:ref(0)
        }
    }
}).mount("#app")


组合 API 是一组 API，允许我们使用导入的函数而不是声明选项来创作 Vue 组件。它是一个涵盖以下 API 的总称：
尽管 API 风格基于函数组合，但组合 API 不是***函数式编程*** 。组合式 API 基于 Vue 的可变、细粒度响应性范式，而函数式编程则强调不变性
选择组合 API
    高效的逻辑重用。它解决了 mixin 的所有缺点，mixin 是 Options API 的主要逻辑重用机制。

模板表达式是沙盒化的，只能访问受限的全局变量列表 。该列表公开了常用的内置全局变量，例如 Math 和 Date。
通过将所有 Vue 表达式添加到 app.config.globalProperties 中来显式定义其他全局变量。

https://vuejs.org/guide/essentials/reactivity-fundamentals.html
reactive的局限性，推荐使用ref

.passive 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。
样式多值​
true-value 和 false-value 是 Vue 特有的 attributes，仅支持和 v-model 配套使用。这里 toggle 属性的值会在选中时被设为 'yes'，取消选择时设为 'no'。你同样可以通过 v-bind 将其绑定为其他动态值：
##  SSR
Vue 也支持将组件在服务端直接渲染成 HTML 字符串，作为服务端响应返回给浏览器，最后在浏览器端将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。
一个由服务端渲染的 Vue.js 应用也可以被认为是“同构的”(Isomorphic) 或“通用的”(Universal)，因为
应用的大部分代码同**时运行在服务端和客户端**。
- 数据获取过程在首次访问时在服务端完成
- 服务端渲染的应用需要一个能让 Node.js 服务器运行的环境
```vue
// 此文件运行在 Node.js 服务器上
import { createSSRApp } from 'vue'
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then((html) => {
  console.log(html)
})
```
服务端写一套html文件返回
```
import express from 'express'
import {
  createSSRApp
} from "vue"
import {
  renderToString
} from 'vue/server-renderer'
const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({
      count: 1
    }),
    template: `<button @click="count++">{{count}} </button>`
  })
  renderToString(app).then((html) => {
    res.send(`
            <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
            `)
  })
})
server.listen(3000, () => {
  console.log('ready')
})
```
服务端的html是静态文件，无法交互
需要在客户端写同样的实例
```
// 该文件运行在浏览器中
import { createSSRApp } from 'vue'

const app = createSSRApp({
  // ...和服务端完全一致的应用实例
})

// 在客户端挂载一个 SSR 应用时会假定
// HTML 是预渲染的，然后执行激活过程，
// 而不是挂载新的 DOM 节点
app.mount('#app')
```
访问平台特有 API
 node-fetch 在服务端和客户端使用相同的 fetch API。
SSR 环境下，应用模块通常只在服务器启动时初始化一次。
  同一个应用模块会在多个服务器请求之间被复用
  而我们的单例状态对象也一样。如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为跨请求状态污染。

// app.js （在服务端和客户端间共享）
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// 每次请求时调用
export function createApp() {
  const app = createSSRApp(/* ... */)
  // 对每个请求都创建新的 store 实例
  const store = createStore(/* ... */)
  // 提供应用级别的 store
  app.provide('store', store)
  // 也为激活过程暴露出 store
  return { app, store }
}
## 虚拟dom
虚拟 DOM 在 React 和大多数其他实现中都是纯运行时的：更新算法无法预知新的虚拟 DOM 树会是怎样，因此它总是需要遍历整棵树、比较每个 vnode 上 props 的区别来确保正确性

在 Vue 中，框架同时控制着编译器和运行时。这使得我们可以为紧密耦合的模板渲染器应用许多编译时优化。
编译器可以静态分析模板并在生成的代码中留下标记，使得运行时尽可能地走捷径。与此同时，我们仍旧保留了边界情况时用户想要使用底层渲染函数的能力。我们称这种混合解决方案为带编译时信息的虚拟 DOM。
### 自定义指令
```
const myDirective = {
  mounted(el, binding) {
    // 客户端实现：
    // 直接更新 DOM
    el.id = binding.value
  },
  getSSRProps(binding) {
    // 服务端实现：
    // 返回需要渲染的 prop
    // getSSRProps 只接收一个 binding 参数
    return {
      id: binding.value
    }
  }
}
```
## immer
不可变数据结构通过永不更改状态对象来解决这个问题。与 Vue 不同的是，它会创建一个新对象，保留旧的对象未发生改变的一部分。在 JavaScript 中有多种不同的方式来使用不可变数据，但我们推荐使用 Immer 搭配 Vue，因为它使你可以在保持原有直观、可变的语法的同时，使用不可变数据。
```js
// immer.ts
import { produce } from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
// app.vue

import { useImmer } from './immer'
  
const [items, updateItems] = useImmer([
  {
     title: "Learn Vue",
     done: true
  },
  {
     title: "Use Vue with Immer",
     done: false
  }
])

function toggleItem(index) {
  updateItems(items => {
    items[index].done = !items[index].done
  })
}
```
##  SSG
静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，
预渲染的页面生成后作为静态 HTML 文件被服务器托管。
## KeepAlive
默认会缓存内部的所有组件实例，但我们可以通过 include 和 exclude prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：
```vue
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>

<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
<!-- 最大缓存实例数 -->
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
 onActivated() 和 onDeactivated() 注册相应的两个状态的生命周期钩子：
```
## 从头开始实现一个简单的路由
如果你只需要一个简单的页面路由，而不想为此引入一整个路由库，你可以通过动态组件的方式，监听浏览器 hashchange 事件或使用 History API 来更新当前组件。
```
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```
## Teleport
```
禁用Teleport
<Teleport :disabled="isMobile">
  ...
</Teleport>
```
## Transition动画组件
仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。
v-enter-form 开始进入
v-enter-to  进入
v-leave-from 开始离开
v-leave-to 离开

可以起name 
[name]-enter-from
....
.fade-enter-from{

}
自定义过渡 class​
你也可以向 <Transition> 传递以下的 props 来指定自定义的过渡 class：

    enter-from-class
        enter-active-class
    enter-to-class
    leave-from-class
        leave-active-class
    leave-to-class
```vue
 
<Transition name="fade">
  <p v-if="show">hello</p>
</Transition>

/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

## 自定义指令
```vue
<script setup>
// 在模板中启用 v-highlight
const vHighlight = {
  mounted: (el) => {
    el.classList.add('is-highlight')
  }
}
</script>

<template>
  <p v-highlight>This sentence is important!</p>
</template>

<!-- 选项式 -->
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-highlight
    highlight: {
      /* ... */
    }
  }
}
<!-- 全局 -->
const app = createApp({})

// 使 v-highlight 在所有组件中都可用
app.directive('highlight', {
  /* ... */
})
```
指令钩子
el
    指令绑定到的元素。这可以用于直接操作 DOM。
binding 
    value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
    oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
    arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"
    modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
    instance：使用该指令的组件实例。
    dir：指令的定义对象。
vnode：代表绑定元素的底层 VNode。
prevVnode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
```
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```
当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 attributes 类似。
不建议使用
## 插件
```vue
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* 可选的选项 */
})
一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 app.use() 的额外选项作为参数

const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
```
插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

通过 app.component() 和 app.directive() 注册一到多个全局组件或自定义指令。

通过 app.provide() 使一个资源可被注入进整个应用。

向 app.config.globalProperties 中添加一些全局实例属性或方法

一个可能上述三种都包含了的功能库 (例如 vue-router)。


## slot
具名插槽
```vue
<slot name="header"></slot>
<template v-slot:header>
    <!-- header 插槽的内容放这里 -->
</template>
<template #header>
    <!-- header 插槽的内容放这里 -->
</template>

条件语句
 v-if="$slots.header"
动态插槽名
 v-slot:[dynamicSlotName]
传参
  <slot :text="greetingMessage" :count="1"></slot>
  <MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
  <MyComponent #footer="{count,text}">
  {{ text }} {{ count }}
</MyComponent>
```

## defineAsyncComponent 异步加载，需要使用的时候才加载

```vue
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000

惰性激活(使用服务器端渲染，这一部分才会适用)

import { defineAsyncComponent, hydrateOnIdle,hydrateOnVisible } from 'vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: hydrateOnIdle(/* 传递可选的最大超时 */)//在空闲时进行激活 requestIdleCallback
           hydrateOnVisible() //在元素变为可见时进行激活。IntersectionObserver
                              //hydrateOnVisible({ rootMargin: '100px' })可以选择传递一个侦听器的选项对象值
            hydrateOnMediaQuery('(max-width:500px)')//在媒体查询匹配时进行激活
            hydrateOnInteraction('click')//交互时激活
            hydrateOnInteraction(['wheel', 'mouseover'])//多类型
})
})
自定义策略


import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  // forEachElement 是一个遍历组件未激活的 DOM 中所有根元素的辅助函数，
  // 因为根元素可能是一个片段而非单个元素
  forEachElement(el => {
    // ...
  })
  // 准备好时调用 `hydrate`
  hydrate()
  return () => {
    // 如必要，返回一个销毁函数
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
```

## 透传 Attributes
未声明的props和emits会透传到子组件
和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。

像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick。

取消透传
```
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```
这些透传进来的 attribute 可以在模板的表达式中直接用 $attrs 访问到
```
<span>Fallthrough attribute: {{ $attrs }}</span>

//useAttrs
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```
## v-model

组件v-model=>defineModel  仅支持 3.4 及以上版本

```js
const model = defineModel()
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />

<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
带参数的 v-model 修饰符​
这里是另一个例子，展示了如何在使用多个不同参数的 v-model 时使用修饰符：

<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/> 
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>

```
3.4 之前的用法
```vue
<script setup>
const props = defineProps({
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>


const obj = reactive({ count: 0 })
```






## 侦听器

watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

回调的触发时机：默认dom更新前触发
如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明 flush: 'post' 选项：
```js
watch(source, callback, {
  flush: 'post'//dom更新后触发
  flush: 'sync'//同步触发的侦听器，它会在 Vue 进行任何更新之前触发：
})
// 两个相同
flush: 'sync'
watchSyncEffect
```
要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：

```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
 ```
```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)
```

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
//深层侦听
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
即时回调的侦听器​
watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

我们可以通过传入 immediate: true 选项来强制侦听器的回调立即执行：

 
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
一次性侦听器 仅支持 3.4 及以上版本
 { once: true }
watchEffect() 允许我们自动跟踪回调的响应式依赖。上面的侦听器可以重写为：

 
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
我们可以使用 onWatcherCleanup()  API 来注册一个清理函数，当侦听器失效并准备重新运行时会被调用：

### onWatcherCleanup 失效
 仅在 Vue 3.5+ 中支持，只支持同步
```js
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})

//onCleanup 函数还作为第三个参数传递给侦听器回调，以及 watchEffect 作用函数的第一个参数：
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

## 模版引用
要在组合式 API 中获取引用，我们可以使用辅助函数 useTemplateRef() ：
```js
import { useTemplateRef, onMounted } from 'vue'
const input = useTemplateRef('my-input')
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```
函数模板引用​
除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

template
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
注意我们这里需要使用动态的 :ref 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null。你当然也可以绑定一个组件方法而不是内联函数。

## 组件
这是由于 HTML 只允许一小部分特殊的元素省略其关闭标签，最常见的就是 <input> 和 <img>。对于其他的元素来说，如果你省略了关闭标签，原生的 HTML 解析器会认为开启的标签永远没有结束，用下面这个代码片段举例来说：

```vue
<my-component /> <!-- 我们想要在这里关闭标签... -->
<span>hello</span>
将被解析为：
 
<my-component>
  <span>hello</span>
</my-component> <!-- 但浏览器会在这里关闭标签-->

```

### 元素位置限制
这将导致在使用带有此类限制元素的组件时出现问题。例如：

template
<table>
  <blog-post-row></blog-post-row>
</table>
自定义的组件 <blog-post-row> 将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。我们可以使用特殊的 is attribute 作为一种解决方案：

template
<table>
  <tr is="vue:blog-post-row"></tr>
</table>

### 生命周期钩子
当调用 onMounted 时，Vue 会自动将回调函数注册到当前正被初始化的组件实例上。这意味着这些钩子应当在组件初始化时被同步注册。例如，请不要这样做：

```js
setTimeout(() => {
  onMounted(() => {
    // 异步注册时当前组件实例已丢失
    // 这将不会正常工作
  })
}, 100)
注意这并不意味着对 onMounted 的调用必须放在 setup() 或 <script setup> 内的词法上下文中。onMounted() 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自 setup() 就可以。
```
https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png
渲染=>遇到组件
setup
beforeCreate
    初始化选项式API
crated
    是否存在预编译模版
        no=>即时编译模版
beforeMount
    初始化渲染，创建和插入dom
mounted
    挂载
        当数据变化
            beforeUpdate
                重新渲染并打补丁
            updated
    取消挂载时
beforeUnmount
    取消挂载
unmounted


onMounted =>创建dom节点后

## props
此外，当我们需要传递解构的 prop 到外部函数中并保持响应性时，这是推荐做法：

```js
useComposable(() => foo)

const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo)
})

<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />
```

## petite-vue 
https://github.com/vuejs/petite-vue
petite-vue 是 Vue 的替代发行版，针对渐进式增强进行了优化。它提供了与标准 Vue 相同的模板语法和响应式心智模型。但是，它专门针对在服务器框架呈现的现有 HTML 页面上“撒播”少量交互进行了优化。查看有关它与标准 Vue 有何不同的更多详细信息。
 只有 ~6kb

 <script src="https://unpkg.com/petite-vue" defer init></script>

<!-- anywhere on the page -->
<div v-scope="{ count: 0 }">
  {{ count }}
  <button @click="count++">inc</button>
</div>
使用 v-scope 标记页面上应该由 petite-vue 控制的区域
init 属性告诉 petite-vue 自动查询和初始化页面上所有具有 v-scope 的元素。

