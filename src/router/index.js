import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'homePage',
        component: () => import(/* webpackChunkName: "homePage" */ '../views/homePage/homePage.vue'),
      },
      {
        path: '/caseCenter',
        name: 'caseCenter',
        component: () => import(/* webpackChunkName: "caseCenter" */ '../views/caseCenter/caseCenter.vue'),
      },
      {
        path: '/newsCenter',
        name: 'newsCenter',
        component: () => import(/* webpackChunkName: "newsCenter" */ '../views/newsCenter/newsCenter.vue'),
      },
      {
        path: '/servicesupport',
        name: 'servicesupport',
        component: () => import(/* webpackChunkName: "servicesupport" */ '../views/servicesupport/servicesupport.vue'),
      },
      {
        path: '/aboutOurs',
        name: 'aboutOurs',
        component: () => import(/* webpackChunkName: "aboutOurs" */ '../views/aboutOurs/aboutOurs.vue'),
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: () => import(/* webpackChunkName: "contactUs" */ '../views/contactUs/contactUs.vue'),
      },
      {
        path: '/productDetail',
        name: 'productDetail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../views/productDetail/productDetail.vue'),
      },
      {
        path: '/newsDetail',
        name: 'newsDetail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../views/productDetail/productDetail.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  window.scrollTo(0,0);
  next()
});

export default router
