import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('../views/Monitor.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/Terms.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
