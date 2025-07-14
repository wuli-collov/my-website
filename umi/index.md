# 安装
pnpm dlx create-umi@latest//脚手架
git clone git@github.com:umijs/umi.git
cd umi
启用 Prettier（可选）
如果需要用 prettier 做项目代码的自动格式化，执行 pnpm umi g
# 目录结构
.umirc.ts与 config/config.ts 文件功能相同，2 选 1 。.umirc.ts 文件优先级较高

public 目录
存放固定的静态资源，如存放 public/image.png ，则开发时可以通过 /image.png 访问到，构建后会被拷贝到输出文件夹。

// 运行时配置
app.[ts｜tsx]
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

layouts/index.tsx
全局布局，默认会在所有路由下生效，比如有以下路由关系：


[
  { path: '/', component: '@/pages/index' },
  { path: '/users', component: '@/pages/users' },
]
输出为：

<Layout>
  <Page>index</Page>
  <Page>users</Page>
</Layout>
.
├── config
│   └── config.ts//配置文件
├── dist //umi build 后产物的默认输出文件夹。可通过 outputPath 配置修改产物输出文件夹。
├── mock //https://umijs.org/docs/guides/mock
│   └── app.ts｜tsx
├── src
│   ├── .umi
│   ├── .umi-production
│   ├── layouts
│   │   ├── BasicLayout.tsx
│   │   ├── index.less
│   ├── models
│   │   ├── global.ts
│   │   └── index.ts
│   ├── pages
│   │   ├── index.less
│   │   └── index.tsx
│   ├── utils // 推荐目录
│   │   └── index.ts
│   ├── services // 推荐目录
│   │   └── api.ts
│   ├── app.(ts|tsx)
│   ├── global.ts //全局前置脚本文件。
│   ├── global.(css|less|sass|scss)//全局样式文件
│   ├── overrides.(css|less|sass|scss)//高优先级全局样式文件。该文件一般专用于覆盖第三方库样式，其中所有 CSS 选择器都会附加 body 前缀以抬高优先级。
│   ├── favicon.(ico|gif|png|jpg|jpeg|svg|avif|webp)
│   └── loading.(tsx|jsx)//全局加载组件。
├── node_modules
│   └── .cache
│       ├── bundler-webpack
│       ├── mfsu
│       └── mfsu-deps
├── .env
├── plugin.ts 
├── .umirc.ts // 与 config/config 文件 2 选一
├── package.json
├── tsconfig.json
└── typings.d.ts

pnpm i && pnpm build
## Umi 文档开发
https://umijs.org/docs/introduce/contributing
Umi 的文档由 Umi@4 和 @umijs/plugin-docs 插件实现，本质上就是一个 Umi 项目。在根目录执行如下命令即可开始 Umi 文档的开发：
```shell
# 安装 Umi 文档依赖
pnpm doc:deps
# 启用 Umi 文档开发
# 首次启动时编译耗时较长，请耐心等待
pnpm doc:dev
```
## 参与 Umi 文档插件开发
https://umijs.org/docs/introduce/contributing

# 路由
假设 pages 目录结构如下：


+ pages/
  + users/
    - index.tsx
  - index.tsx
  那么，会自动生成路由配置如下：
[
  { path: '/', component: '@/pages/index.tsx' },
  { path: '/users/', component: '@/pages/users/index.tsx' },
]
## 动态路由
约定带 $ 前缀的目录或文件为动态路由。若 $ 后不指定参数名，则代表 * 通配，比如以下目录结构：

+ pages/
  + foo/
    - $slug.tsx
  + $bar/
    - $.tsx
  - index.tsx
会生成路由配置如下：

[
  { path: '/', component: '@/pages/index.tsx' },
  { path: '/foo/:slug', component: '@/pages/foo/$slug.tsx' },
  { path: '/:bar/*', component: '@/pages/$bar/$.tsx' },
]
### 路由权限
wrappers
Type: string[]
配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验：

export default {
  routes: [
    { path: '/user', component: 'user',
      wrappers: [
        '@/wrappers/auth',
      ],
    },
    { path: '/login', component: 'login' },
  ]
}
然后在 src/wrappers/auth 中，

import { Navigate, Outlet } from 'umi'

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}
这样，访问 /user，就通过 auth 组件做权限校验，如果通过，渲染 src/pages/user，否则跳转到 /login。

页面跳转
命令式跳转请使用 history API
https://umijs.org/docs/api/api#history

组件内还可以使用 useNavigate hook

Link 组件
import { Link } from 'umi';

export default function Page() {
  return (
    <div>
      <Link to="/users">Users Page</Link>
    </div>
  )
}
### 获取路由信息
match 信息
useMatch

const match = useMatch('/comp/:id')
// match 
{
  "params": {
    "id": "paramId"
  },
  "pathname": "/comp/paramId/",
  "pathnameBase": "/comp/paramId",
  "pattern": {
    "path": "/comp/:id",
    "caseSensitive": false,
    "end": true
  }
}
### 路由动态参数
const params  = useParams();
// params
{
  "id": "paramId"
}
# 插件
使用插件
在普通的 Umi 应用中，默认 不附带任何插件 ，如需使用 Max 的功能（如 数据流、antd 等），需要手动安装插件并开启他们：

pnpm add -D @umijs/plugins
如开启 antd 插件：


// .umirc.ts
export default {
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {}
}
# layout
在全局布局 src/layouts/index 中，通过 <Outlet/> 来渲染子路由：


import { Outlet } from 'umi'

export default function Page() {
  return (
    <div style={{ padding: 20 }}> 
      <Outlet/> 
    </div>
  )
}
# 样式
https://umijs.org/docs/guides/styling

# 页面进来就可以显示数据了
在路由文件中，除了默认导出的页面组件外，再导出一个 clientLoader 函数，并且在该函数内完成路由数据加载的逻辑。
// pages/.../some_page.tsx

import { useClientLoaderData } from 'umi';

export default function SomePage() {
  const { data } = useClientLoaderData();
  return <div>{data}</div>;
}

export async function clientLoader() {
  const data = await fetch('/api/data');
  return data;
}
如上代码，在 clientLoader 函数返回的数据，可以在组件内调用 useClientLoaderData 获取。

# 环境变量
https://umijs.org/docs/guides/env-variables
我们约定所有以 UMI_APP_ 开头的环境变量会默认注入到浏览器中，无需配置 define 手动注入。