import VueRouter from 'vue-router'


// 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'HomeContainer',
      component: () => import('./components/HomeContainer.vue')
    },
    {
      path: '/member',
      name: 'MemberContainer',
      component: () => import('./components/MemberContainer.vue')
    },
    {
      path: '/shopCar',
      name: 'ShopCarContainer',
      component: () => import('./components/ShopCarContainer.vue')
    },
    {
      path: '/search',
      name: 'SearchContainer',
      component: () => import('./components/SearchContainer.vue')
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是叫 router-link-active
})

// 把路由对象暴露出去
export default router