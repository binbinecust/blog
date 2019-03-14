import Promise from 'promise';
import Vue from 'vue';

// 用法：https://github.com/axios/axios#request-config
import axios from 'axios';

// 用法：https://github.com/pillarjs/path-to-regexp
import pathToRegExp from 'path-to-regexp';

const vm = new Vue();
/**
 * option: {
 *  bNotCommonError: // true：不采用/false：采用，是否采用通用错误处理，默认 false，也就是采用
 * }
 */
function fnPureProcessResourceData(option) {
  return new Promise(function(resolve, reject) {
    if (option.oNoneRESTful) {
      let toPath = pathToRegExp.compile(option.url);
      try {
        option.url = toPath(option.oNoneRESTful);
      } catch (e) {
        console.error(e);
        return;
      }
    }
    axios(option)
      .then(oRes => {
        resolve(oRes.data);
      })
      .catch(oError => {
        if (!option.bNotCommonError && oError && oError.response && oError.response.status === 403) {
          vm.$message.error('登录信息失效');
          location.href = '/login';
        } else if (!option.bNotCommonError && oError.message) {
          if (oError.response && oError.response.data && oError.response.data.state && oError.response.data.state.msg) {
            vm.$message.error(oError.response.data.state.msg);
          } else {
            vm.$message.error(oError.message || '未知错误');
          }
        }
        reject(oError);
      });
  });
}

export default fnPureProcessResourceData;
