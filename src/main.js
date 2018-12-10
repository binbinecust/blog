import Vue from 'vue';
import App from './App.vue';
import router from './router/index.ts';
import store from './store';
import oFedc from './fedc/index.ts';
import './plugins/element.js';

Vue.config.productionTip = false;
Vue.use(oFedc);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
