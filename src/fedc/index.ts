import { User } from './apis/user'
import { Daily, Album, Square } from './apis/common'
import Vue from 'vue'

const oDataCenter = {
  user: new User(),
  daily: new Daily(),
  album: new Album(),
  square: new Square()
}

const oFedc: any = {}

oFedc.install = function(vue, option) {
  Vue.prototype.$dc = oDataCenter
}

export default oFedc
