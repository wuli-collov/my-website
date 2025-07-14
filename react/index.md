# 生命周期

创建阶段
constructor
getDerivedStateFromProps:组件创建和更新阶段，不论是 props 变化还是 state 变化，也会调用
render:用于渲染 DOM 结构，可以访问组件 state 与 prop 属性
componentDidMount:组件挂载到真实 DOM 节点后执行，其在 render 方法之后执行
更新阶段
getDerivedStateFromProps
shouldComponentUpdate:用于告知组件本身基于当前的 props 和 state 是否需要重新渲染组件，默认情况返回 true
render
getSnapshotBeforeUpdate
该周期函数在 render 后执行，执行之时 DOM 元素还没有被更新
该方法返回的一个 Snapshot 值，作为 componentDidUpdate 第三个参数传入
componentDidUpdate:组件更新结束后触发
卸载阶段
componentWillUnmount
此方法用于组件卸载前，清理一些注册是监听事件，或者取消订阅的网络请求等
一旦一个组件实例被卸载，其不会被再次挂载，而只可能是被重新创建

在组件生命周期或 React 合成事件中，setState 是异步
在 setTimeout 或者原生 dom 事件中，setState 是同步

# react 事件

React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等

在 React 中这套事件机制被称之为合成事件

合成事件（SyntheticEvent）
合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器

根据 W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口，例如：
如果想要获得原生 DOM 事件，可以通过 e.nativeEvent 属性获取

React 上注册的事件最终会绑定在 document 这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
React 有一套自己的合成事件 SyntheticEvent

为了解决上面正确输出 this 的问题，常见的绑定方式有如下：

render 方法中使用 bind
render 方法中使用箭头函数
constructor 中 bind
定义阶段使用箭头函数绑定
