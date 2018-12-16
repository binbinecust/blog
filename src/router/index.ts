import Vue from 'vue'
import Router from 'vue-router'

import login from './login'
import main from './main'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [login, main]
})

export default router
