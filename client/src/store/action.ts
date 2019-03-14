import Vue from 'vue'
import Promise from 'promise'

const vm = new Vue()

export default {
  loginAct({ commit }, data) {
    return new Promise((resolve, reject) => {
      vm.$dc.user
        .login(data)
        .then((res: any) => {
          commit('loginMut', res.data.user)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
