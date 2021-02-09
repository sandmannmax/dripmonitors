import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from '../auth/guard';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/Privacy.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/Terms.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
