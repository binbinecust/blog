import Vue from 'vue'
import Router from 'vue-router'

import login from './login'
import home from './home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [login, home]
})

export default router
