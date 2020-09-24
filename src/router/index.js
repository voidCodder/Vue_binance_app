import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GlassPage',
    component: () =>
      import(/* webpackChunkName:"GlassPage" */ '../views/GlassPage.vue')
  },
  {
    path: '/diff',
    name: 'DiffPage',
    component: () =>
      import(/* webpackChunkName:"DiffPage" */ '../views/DiffPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
