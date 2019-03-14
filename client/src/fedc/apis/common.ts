import BaseAPI from '../base';
import fnPureProcessResourceData from '../utils';

class Daily extends BaseAPI {
  sThumbedUserListUrl: string;
  sThumbUrl: string;
  constructor() {
    super();
    this.sListUrl = '/api/daily/list'; // 日记列表
    this.sCreateUrl = '/api/daily/create'; // 创建日记
    this.sThumbedUserListUrl = '/api/daily/thumbedUserList'; // 点赞人员id列表
    this.sThumbUrl = '/api/daily/thumb'; // 点赞与取消点赞
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

  thumbedUserList(option = {}) {
    return fnPureProcessResourceData({
      url: this.sThumbedUserListUrl,
      method: 'post',
      ...option
    });
  }

  thumb(option = {}) {
    return fnPureProcessResourceData({
      url: this.sThumbUrl,
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
