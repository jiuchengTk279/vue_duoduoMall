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
      component: () => import('./components/tabBar/HomeContainer.vue'),
    },
    {
      path: '/member',
      name: 'MemberContainer',
      component: () => import('./components/tabBar/MemberContainer.vue')
    },
    {
      path: '/shopCar',
      name: 'ShopCarContainer',
      component: () => import('./components/tabBar/ShopCarContainer.vue')
    },
    {
      path: '/search',
      name: 'SearchContainer',
      component: () => import('./components/tabBar/SearchContainer.vue')
    },
    {
      path: '/home/newsList',
      name: 'NewsList',
      component: () => import('./components/news/newsList.vue')
    },
    {
      path: '/home/newsInfo/:id',
      name: 'NewsInfo',
      component: () => import('./components/news/newsInfo.vue')
    },
    {
      path: '/home/photoList',
      name: 'PhotoList',
      component: () => import('./components/photo/PhotoList.vue')
    },
    {
      path: '/home/photoInfo/:id',
      name: 'PhotoInfo',
      component: () => import('./components/photo/PhotoInfo.vue')
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类是叫 router-link-active
})

// 把路由对象暴露出去
export default router