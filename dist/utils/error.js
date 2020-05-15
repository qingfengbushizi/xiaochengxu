'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _common = require('./common.js');

/**
 *
 * @param {string} name 错误名字
 * @param {string} action 错误动作描述
 * @param {string} info 错误信息，通常是 fail 返回的
 */
// eslint-disable-next-line
var logError = exports.logError = function logError(name, action, info) {
  if (!info) {
    info = 'empty';
  }
  var time = (0, _common.formatTime)(new Date());
  console.error(time, name, action, info);
  if ((typeof info === 'undefined' ? 'undefined' : _typeof(info)) === 'object') {
    info = JSON.stringify(info);
  }
};