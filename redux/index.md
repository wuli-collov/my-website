# Redux

把改变数据，复制数据
useSelector 获取 store 中的数据
useDispatch 获取 dispatch 方法
提交 action 对象：执行 store 中导出的 actionCreater 方法

Redux Toolkit
简化了编写 Redux 逻辑和设置 store 的过程
是 redux 的工具包，

模块化

moudule/counterStore.js

useSelector 获取 store 中的数据
useDispatch 获取 dispatch 方法
如何提交 action 对象：执行 store 中导出的 actionCreater 方法

<!-- counterStore -->

```js
import { createSlice } from '@reduxjs/toolkit';
// 创建一个store模块
const counterSlice = createSlice({
  name: 'counter',
  //   初始化state
  initialState: {
    count: 0,
  },
  //   修改状态的方法，同步方法
  reducers: {
    incremented: (state) => {
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.count += 1;
    },
    decremented: (state) => {
      state.count -= 1;
    },
    addToNum: (state, action) => {
      // action.payload 获取传过来的参数
      state.count = action.payload;
    },
  },
});
// 结构出来actionCreater函数
export const { incremented, decremented, addToNum } = counterSlice.actions;
// 获取reducer
const reducer = counterSlice.reducer;
export default reducer;
```

```js
// index.js
// 导入子模块counter 模块
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './moudule/counterStore.js';

// 把子模块组合起来
const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
// 默认导出
export default store;
// 可以订阅 store
store.subscribe(() => console.log(store.getState()));

// 将我们所创建的 action 对象传递给 `dispatch`
store.dispatch(incremented());
// {count: 1}
store.dispatch(incremented());
// {count: 2}
store.dispatch(decremented());
// {count: 1}
```

<!-- 为react注入store -->

```js
// index.js文件
import { Provider } from 'react-redux';
import store from './store/index.js';

// 在根文件注入store
<Provider store={store}>
  <App />
</Provider>;
```

<!-- 在组件中使用store数据 -->

需要用到 useSelector,它的作用是把 store 中的数据映射到组件中

```js
// app.js
import { useSelector,useDispatch } from '@reduxjs/toolkit';
// const store = configureStore({
//   reducer: {
//     counter:counterSlice
// state.counter指向的就是这个reducer中的counter
// count就是解构出来里面的countstate
//   },
// });
import {count} = useSelector(state=>state.counter)
<div>
{count}
</div>


// 修改数据需要借助另一个hook函数，useDispatch，它的作用是生成提交action对象的dispatch函数
const dispatch= useDispatch()

<button onClick={()=>dispatch(incremented())}>+</button>
<button onClick={()=>dispatch(incremented())}>-</button>
<button onClick={()=>dispatch(addToNum(10))}>+10</button>

```

<!-- 异步操作 -->

1.创建 store 写法不变，配置同步修改状态的方法 2.单独封装一个函数，在函数内部 return 一个新函数，在新函数中
2.1 封装异步请求获取数据
2.2 调用同步 actionCreater 传染异步数据生成一个 action 对象，并使用 dispatch 提交 3.组件中 dispatch 写法保持不变

```js
// modules/changeStrore.js
import { createSlice } from '@reduxjs/toolkit';
// 1.创建store写法不变，配置同步修改状态的方法
const channelStore=createSlice({
    name:'channel',
    intialState:{
        channelList:[]
    },
    reducers:{
        setChannels(state,action){
            state.channelList=action.payload
        }
    }
})
const {setChannels} =channelStore.actions
// 2.单独封装一个函数，在函数内部return一个新函数，在新函数中
// 异步请求部分

const fetchChannelList=()=>{
    return  async (dispatch)=>{
       const res=await axios.get("http://wlllss")
       dispatch(setChannels(red.data.data.channels))
    }
}

export {fetchChannelList}
const reducer=channelStore.reducer
export default= reducer

```

<!-- 入口文件组合起来 -->

```js
import chnnelReducer from './modules/changeStrore.js';
const store = configureStore({
  reducer: {
    counter: counterSlice,
    channe: chnnelReducer,
  },
});
export default store;
```

<!-- 组件中使用 -->

```js
import { fetchChannelList } from './store/modules/changeStrore.js';
const { channelList } = useSelector((state) => state.channe);
const dispatch = useDispatch();

//使用useSffect触发异步请求
useEffect(() => {
  dispatch(fetchChannelList());
}, [dispatch]);
```
