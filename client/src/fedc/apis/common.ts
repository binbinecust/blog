import BaseAPI from '../base';
import fnPureProcessResourceData from '../utils';

class Daily extends BaseAPI {
  constructor() {
    super();
    this.sListUrl = '/api/daily/list'; // 日记列表
    this.sCreateUrl = '/api/daily/create'; // 创建日记
  }

  list(option = {}) {
    return fnPureProcessResourceData({
      url: this.sListUrl,
      method: 'post',
      ...option
    });
  }

  create(option = {}) {
    return fnPureProcessResourceData({
      url: this.sCreateUrl,
      method: 'post',
      ...option
    });
  }
}

class Album extends BaseAPI {
  constructor() {
    super();
    this.sListUrl = '/api/album/list';
  }

  list(option = {}) {
    return fnPureProcessResourceData({
      url: this.sListUrl,
      method: 'post',
      ...option
    });
  }
}

class Square extends BaseAPI {
  constructor() {
    super();
    this.sListUrl = '/api/square/list';
  }

  list(option = {}) {
    return fnPureProcessResourceData({
      url: this.sListUrl,
      method: 'post',
      ...option
    });
  }
}

export { Daily, Album, Square };
