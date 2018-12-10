import BaseAPI from '../base';
import fnPureProcessResourceData from '../utils.ts';

class User extends BaseAPI {
  constructor() {
    super();
    this.sRetrieveUrl = '/api/login';
    this.sSignup = '/api/signup';
  }

  login(option) {
    return fnPureProcessResourceData({
      url: this.sRetrieveUrl,
      method: 'post',
      ...option
    });
  }

  signup(option) {
    return fnPureProcessResourceData({
      url: this.sSignup,
      method: 'post',
      ...option
    });
  }
}

export { User };
