# Vue Router
1.全局注册 RouterView 和 RouterLink 组件。
2.添加全局 $router 和 $route 属性。
3.启用 useRouter() 和 useRoute() 组合式函数。
4.触发路由器解析初始路由。
创建路由器实例
路由器实例是通过调用 createRouter() 函数创建的:
createMemoryHistory()，它会完全忽略浏览器的 URL 而使用其自己内部的 URL
通常，你应该使用 createWebHistory() 或 createWebHashHistory()
```js
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
```

注册路由器插件
createApp(App).use(router).mount('#app')

可选参数
你也可以通过使用 ? 修饰符(0 个或 1 个)将一个参数标记为可选：
```js
const routes = [
  // 匹配 /users 和 /users/posva
  { path: '/users/:userId?' },
  // 匹配 /users 和 /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

```
忽略父组件
由于父级没有指定路由组件，顶级 <router-view> 将跳过父级并仅使用子路由组件
const routes = [
  {
    path: '/admin',
    children: [
      { path: '', component: AdminOverview },
      { path: 'users', component: AdminUserList },
      { path: 'users/:id', component: AdminUserDetails },
    ], 
  },
]
```
命名视图
```js
<router-view class="view left-sidebar" name="LeftSidebar" />
<router-view class="view main-content" />
<router-view class="view right-sidebar" name="RightSidebar" />

// 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```

重定向
```
const routes = [{ path: '/home', redirect: '/' }]


const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]




const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      return to.path.replace(/posts$/, 'profile')
    },
  },
]
```

别名
将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会被匹配为用户正在访问 /。
可以将其他路由的页面在当前页面显示
```
const routes = [{ path: '/', component: Homepage, alias: '/home' }]

const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]

const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```
```
然后我们可以通过设置 props: true 来配置路由将 id 参数作为 prop 传递给组件
const routes = [
  { path: '/user/:id', component: User, props: true }
]
对于有命名视图的路由，你必须为每个命名视图定义 props 配置：
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

如果当前路径是 /user/erina/role/admin，那么这两个链接都会被认为是匹配当前路由的，因此 router-link-active 类会应用于这两个链接。但只有第二个链接会被认为是精确的，因此只有第二个链接会有 router-link-exact-active 类。
```
const routes = [
  {
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'role/:roleId',
        component: Role,
      }
    ]
  }
]

<RouterLink to="/user/erina">
  User
</RouterLink>
<RouterLink to="/user/erina/role/admin">
  Role
</RouterLink>
```

配置类名
RouterLink 组件有两个属性，activeClass 和 exactActiveClass，可以用来更改应用的类名：
```
<RouterLink
  activeClass="border-indigo-500"
  exactActiveClass="border-indigo-700"
  ...
>
默认的类名也可以通过传递 linkActiveClass 和 linkExactActiveClass 选项给 createRouter() 来全局更改：


const router = createRouter({
  linkActiveClass: 'border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  // ...
})
```
# 全局前置守卫

你可以使用 router.beforeEach 注册一个全局前置守卫：
可以返回的值如下:
    false: 取消当前的导航。
     一个路由地址: 通过一个路由地址重定向到一个不同的地址，   
```
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```
# 在 setup 中访问路由和当前路由
```
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
<!-- 只监听query -->
function pushWithQuery(query) {
  router.push({
    name: 'search',
    query: {
      ...route.query,
      ...query,
    },
  })
}
</script>
```
# 导航守卫
```
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

// 与 beforeRouteLeave 相同，无法访问 `this`
onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    'Do you really want to leave? you have unsaved changes!'
  )
  // 取消导航并停留在同一页面上
  if (!answer) return false
})

const userData = ref()

// 与 beforeRouteUpdate 相同，无法访问 `this`
onBeforeRouteUpdate(async (to, from) => {
  //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
  if (to.params.id !== from.params.id) {
    userData.value = await fetchUser(to.params.id)
  }
})
</script>
```
# scrollBehavior
```
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
添加路由
动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()。它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 router.push() 或 router.replace() 来手动导航，才能显示该新路由。我们来看一个例子：