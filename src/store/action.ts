import Vue from 'vue'

const vm = new Vue()

export default {
  loginAct({ commit }, data) {
    return new Promise((resolve, reject) => {
      vm.$dc.user
        .login(data)
        .then(res => {
          commit('loginMut', res)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
