"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _status = require("../constants/status.js");

var _config = require("../config.js");

var _error = require("../utils/error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  baseOptions: function baseOptions(params) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var url = params.url,
        data = params.data;
    // encodeURIComponent(Taro.getStorageSync('token'))

    var option = {
      isShowLoading: true,
      loadingText: '正在加载',
      url: _config.baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'API-XUID': 1,
        'access_token': _index2.default.getStorageSync('token')
      },
      success: function success(res) {
        if (res.statusCode === _status.HTTP_STATUS.NOT_FOUND) {
          return (0, _error.logError)('api', '请求资源不存在');
        } else if (res.statusCode === _status.HTTP_STATUS.BAD_GATEWAY) {
          return (0, _error.logError)('api', '服务端出现了问题');
        } else if (res.statusCode === _status.HTTP_STATUS.FORBIDDEN) {
          return (0, _error.logError)('api', '没有权限访问');
        } else if (res.statusCode === _status.HTTP_STATUS.SUCCESS) {
          return res.data;
        }
      },
      error: function error(e) {
        (0, _error.logError)('api', '请求接口出现问题', e);
      }
    };
    if (url.indexOf('/user/learn/') == -1) {
      if (url.indexOf('/course/live') == -1) {
        _index2.default.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 1000
        });
      }
    }
    return _index2.default.request(option);
  },
  get: function get(url, data) {
    var option = { url: url, data: data };
    return this.baseOptions(option);
  },

  post: function post(url, data) {
    var params = { url: url, data: data };
    return this.baseOptions(params, 'POST');
  },
  put: function put(url, data) {
    var option = { url: url, data: data };
    return this.baseOptions(option, 'PUT');
  },
  delete: function _delete(url, data) {
    var option = { url: url, data: data };
    return this.baseOptions(option, 'DELETE');
  }
};