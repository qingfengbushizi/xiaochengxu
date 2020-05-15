"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPerson = undefined;

var _home = require("../constants/home.js");

var _api = require("../services/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 配置
var getPerson = exports.getPerson = function getPerson() {
  return function (dispatch) {
    _api2.default.get('/person').then(function (res) {
      var person = res.data;
      dispatch({
        type: _home.GETPERSON,
        payload: {
          person: person
        }
      });
    });
  };
};