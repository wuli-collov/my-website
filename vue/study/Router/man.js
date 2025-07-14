import RouterLink from './component/RouterLink.vue'
import RouterView from './component/RouterView.vue'
export default {
  install(app) {
    // 注册全局组件
    app.component("RouterView", RouterView)
    app.component("RouterLink", RouterLink)

    // 添加全局属性
    app.config.globalProperties.$router = {

    }
    app.config.globalProperties.$route = {

    }
    // 3.启用 useRouter() 和 useRoute() 组合式函数。


    // 4.触发路由器解析初始路由。

  }
}
