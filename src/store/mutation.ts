export default {
  loginMut: (state, data) => {
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('oUser', JSON.stringify(data))
    state.oUser = data
  }
}
