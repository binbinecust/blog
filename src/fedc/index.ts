import { User } from './apis/user.ts';
import Vue from 'vue';

const oDataCenter = {
  user: new User()
};

const oFedc = {};

oFedc.install = function(vue, option) {
  Vue.prototype.$dc = oDataCenter;
};

export default oFedc;
