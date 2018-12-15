export default class BaseAPI {
  // 创建 类型的请求，对应的 URL
  // eslint-disable-next-line
  sCreateUrl?: string
  // 获取 类型的请求，对应的 URL
  sRetrieveUrl?: string
  // 更新 类型的请求，对应的 URL
  sUpdateUrl?: string
  // 删除 类型的请求，对应的 URL
  sDeleteUrl?: string
  // 列表 类型的请求，对应的 URL
  sListUrl?: string

  // 创建 类型的请求，对应的操作，返回 promise 实例
  create() {}
  // 获取 类型的请求，对应的操作，返回 promise 实例
  retrieve() {}
  // 更新 类型的请求，对应的操作，返回 promise 实例
  update() {}
  // 删除 类型的请求，对应的操作，返回 promise 实例
  delete() {}
  // 列表 类型的请求，对应的操作，返回 promise 实例
  list() {}
}
