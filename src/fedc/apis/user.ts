import BaseAPI from '../base'
import fnPureProcessResourceData from '../utils'

class User extends BaseAPI {
  sSignup: string
  constructor() {
    super()
    this.sRetrieveUrl = '/api/login'
    this.sSignup = '/api/signup'
    this.sUpdateUrl = '/api/save'
  }

  login(option) {
    return fnPureProcessResourceData({
      url: this.sRetrieveUrl,
      method: 'post',
      ...option
    })
  }

  signup(option) {
    return fnPureProcessResourceData({
      url: this.sSignup,
      method: 'post',
      ...option
    })
  }

  save(option) {
    return fnPureProcessResourceData({
      url: this.sUpdateUrl,
      method: 'post',
      ...option
    })
  }
}

export { User }
