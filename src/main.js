// 入口文件
import Vue from 'vue'
// 引入 vue-router,并且使用
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 引入并注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
  state: { // this.$store.state
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    car: [] // 将购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品的对象
  },
  mutations: { // this.$store.commit('方法的名称', '按需传入的唯一参数')
    // 点击加入购物车，会将信息保存到 store 中的 car
    addCar(state, goodsInfo) {
      // 分析情况：
      // 1. 如果购物车中，之前已经有了这个对应的商品，那么就只需要更新商品的数量
      // 2. 如果购物车中没有，那么就 push 添加到 car 数组中

      // 假设在购物车中没有找到对应的商品，flag 的值可以用来区分购物车中是否存在对应的商品
      var flag = false

      // 说明购物车对应商品已存在,修改数量
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count += parseInt(goodsInfo.count)
          flag = true
          return true
        }
      })

      // 循环完以后，得到的 flag 还是 false ，说明购物车对应商品不存在，push 添加到 car 中
      if (!flag) {
        state.car.push(goodsInfo)
      }

      // 当更新 car 以后，会将 car 数组存储到本地的 localStorage 中
      // localStorage 只能存储字符串，不能存数组，state.car 为数组，需要通过 JSON.stringify 将数组转换为字符串 
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 修改购物车中的商品数量值
    updateGoodsInfo (state, goodsInfo) {
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count = parseInt(goodsInfo.count)
          return true
        }
      })

      //修改完以后保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 删除 store 中的数据
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return false
        }
      })

      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected (state, info) {
      state.car.forEach(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters:{ // this.$store.getters
    // 相当于计算属性，过滤器
    // 计算徽标的数值
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 购物车列表中商品对应的数量
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    // 购物车列表商品是否被选中
    getGoodsSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    // 计算总价格和总数
    getGoodsCountAndAmount (state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        // 商品被勾选
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

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
// 全局设置 post 时候表单数据组织格式
Vue.http.options.emulateJSON = true;

// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.use(Lazyload)
// 全局导入 Mint-UI 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 挂载路由对象到 vm 的实例上
  store // 挂载 store状态管理对象
})

// 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， 
// render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中