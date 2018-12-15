import { User } from './apis/user'
import Vue from 'vue'

const oDataCenter = {
  user: new User()
}

const oFedc: any = {}

oFedc.install = function(vue, option) {
  Vue.prototype.$dc = oDataCenter
}

export default oFedc
