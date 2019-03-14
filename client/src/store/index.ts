import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getter';
import actions from './action';
import mutations from './mutation';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
