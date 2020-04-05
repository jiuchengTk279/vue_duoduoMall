// 入口文件
import Vue from 'vue'
// 引入 vue-router,并且使用
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 引入格式化时间的插件
import moment from 'moment'
// 定义全局的时间过滤器
Vue.filter('dataFormat', function (dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})


// 导入 vue-resource,并且使用
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io';

// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 导入 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 挂载路由对象到 vm 的实例上
})

// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， 
// render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中