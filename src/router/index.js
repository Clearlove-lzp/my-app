import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/front/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'homePage',
        component: () => import(/* webpackChunkName: "homePage" */ '../views/front/homePage/homePage.vue'),
      },
      {
        path: '/caseCenter',
        name: 'caseCenter',
        component: () => import(/* webpackChunkName: "caseCenter" */ '../views/front/caseCenter/caseCenter.vue'),
      },
      {
        path: '/newsCenter',
        name: 'newsCenter',
        component: () => import(/* webpackChunkName: "newsCenter" */ '../views/front/newsCenter/newsCenter.vue'),
      },
      {
        path: '/servicesupport',
        name: 'servicesupport',
        component: () => import(/* webpackChunkName: "servicesupport" */ '../views/front/servicesupport/servicesupport.vue'),
      },
      {
        path: '/aboutOurs',
        name: 'aboutOurs',
        component: () => import(/* webpackChunkName: "aboutOurs" */ '../views/front/aboutOurs/aboutOurs.vue'),
      },
      {
        path: '/contactUs',
        name: 'contactUs',
        component: () => import(/* webpackChunkName: "contactUs" */ '../views/front/contactUs/contactUs.vue'),
      },
      {
        path: '/productDetail',
        name: 'productDetail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../views/front/productDetail/productDetail.vue'),
      },
      {
        path: '/newsDetail',
        name: 'newsDetail',
        component: () => import(/* webpackChunkName: "productDetail" */ '../views/front/productDetail/productDetail.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/admin/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/newsManagement',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue'),
    children: [
      {
        path: '/admin/newsManagement',
        name: 'newsManagement',
        component: () => import(/* webpackChunkName: "newsManagement" */ '../views/admin/newsManagement/newsManagement.vue'),
      },
      {
        path: '/admin/productManagement',
        name: 'productManagement',
        component: () => import(/* webpackChunkName: "productManagement" */ '../views/admin/productManagement/productManagement.vue'),
      },
      {
        path: '/admin/newsEdit',
        name: 'newsEdit',
        component: () => import(/* webpackChunkName: "newsEdit" */ '../views/admin/newsManagement/addAndEditNews.vue'),
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
