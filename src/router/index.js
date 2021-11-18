import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index/index.vue')
  }, {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/mine.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
