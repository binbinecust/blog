import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import oFedc from './fedc/index'
import './plugins/element.js'
import { Message } from 'element-ui'

Vue.config.productionTip = false
Vue.use(oFedc)

router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem('isLogin')
  if (isLogin) {
    store.state.isLogin = true
    next()
    if (!to.meta.isLogin) {
      // tslint-disable-next-line
      Message.warning('请先退出登录！')
      next({
        path: '/'
      })
    }
  } else {
    // 用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
      // iViewUi友好提示
      // tslint-disable-next-line
      Message.error('请先登录')
      // 用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
