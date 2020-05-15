"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateDiff = exports.learnNum = exports.subNumTxt = exports.subTxt = exports.conver = exports.time_ms = exports.forTimes = exports.forTimer = exports.forTime = exports.formatDate = exports.formatTimeStampToTime = exports.formatCount = exports.isHistory = exports.chatTime = exports.liveday = exports.logHistory = exports.formatTime = exports.formatNumber = undefined;
exports.getExactTime = getExactTime;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function zero(obj) {
  if (obj < 10) return "0" + obj;else return obj;
}
var formatNumber = exports.formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
var formatTime = exports.formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
var logHistory = exports.logHistory = function logHistory(courseId) {
  var historys = _index2.default.getStorageSync("history");
  var cstr = courseId + '';
  var arr = [];
  if (historys != "") {
    arr = historys.split(",");
  }
  if (arr.indexOf(cstr) == -1) {
    arr.push(cstr);
  }
  try {
    _index2.default.setStorageSync("history", arr.join(","));
  } catch (e) {
    console.info(e);
  }
};
var liveday = exports.liveday = function liveday(beg_time) {
  var nowTime = new Date();
  var endTime = new Date(beg_time * 1000);
  var year = endTime.getFullYear();
  var month = endTime.getMonth() + 1;
  var day = endTime.getDate();
  var hour = endTime.getHours();
  var minute = endTime.getMinutes();
  var nowday = nowTime.getDate();
  var t = endTime.getTime() - nowTime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  var type_day = day - nowday;
  if (t > 1) {
    if (type_day === 0) {
      return '今天 ' + zero(hour) + ':' + zero(minute) + ' 开播';
    } else if (type_day === 1) {
      return '明天 ' + zero(hour) + ':' + zero(minute) + ' 开播';
    } else if (type_day > 1) {
      return year + '-' + zero(month) + '-' + zero(day) + ' ' + zero(hour) + ':' + zero(minute) + ' 开播';
    }
  } else {
    return '即将开始';
  }
};
var chatTime = exports.chatTime = function chatTime(time) {
  var nowTime = new Date();
  var endTime = new Date(time * 1000);
  var year = endTime.getFullYear();
  var month = endTime.getMonth() + 1;
  var day = endTime.getDate();
  var hour = endTime.getHours();
  var minute = endTime.getMinutes();
  var nowday = nowTime.getDate();
  var t = nowTime.getTime() - endTime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  var type_day = nowday - day;
  if (t > 1) {
    if (type_day === 0) {
      return zero(hour) + ':' + zero(minute);
    } else if (type_day === 1) {
      return '昨天 ' + zero(hour) + ':' + zero(minute);
    } else if (type_day > 1) {
      return year + '-' + zero(month) + '-' + zero(day) + ' ' + zero(hour) + ':' + zero(minute);
    }
  } else {
    return zero(hour) + ':' + zero(minute);
  }
};
var isHistory = exports.isHistory = function isHistory(courseId) {
  var historys = _index2.default.getStorageSync("history");
  var cstr = courseId + '';
  var arr = historys.split(",");
  return arr.indexOf(cstr) >= 0;
};
// 格式化播放次数
var formatCount = exports.formatCount = function formatCount(times) {
  var formatTime = 0;
  times = times ? Number(times) : 0;
  switch (true) {
    case times > 100000000:
      formatTime = (times / 100000000).toFixed(1) + "\u4EBF";
      break;
    case times > 100000:
      formatTime = (times / 10000).toFixed(1) + "\u4E07";
      break;
    default:
      formatTime = times;
  }
  return formatTime;
};
// 格式化时间戳为日期
var formatTimeStampToTime = exports.formatTimeStampToTime = function formatTimeStampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
};
// 格式化 日期
var formatDate = exports.formatDate = function formatDate(datestamp) {
  var datestr = datestamp;
  var year = datestr.getFullYear();
  var month = datestr.getMonth() + 1;
  var day = datestr.getDate();
  return [year, month, day].map(formatNumber).join('-');
};
// 格式化时间
var forTime = exports.forTime = function forTime(duration) {
  var time = duration;
  var h = Math.floor(time / 3600);
  var m = Math.floor(time / 60 % 60);
  var s = Math.floor(time % 60);
  if (time < 60) {
    return s + "秒";
  } else if (60 < time && time < 3600) {
    return m + "分钟" + s + "秒";
  } else if (time > 3600) {
    return h + "小时" + m + "分钟" + s + "秒";
  }
};
// 格式化时间
var forTimer = exports.forTimer = function forTimer(duration) {
  var time = duration;
  var h = Math.floor(time / 3600);
  var m = Math.floor(time / 60 % 60);
  var s = Math.floor(time % 60);
  if (time < 60) {
    return '00 : ' + zero(s);
  } else if (60 < time && time < 3600) {
    return zero(m) + " : " + zero(s);
  } else if (time > 3600) {
    return zero(h) + ":" + zero(m) + ":" + zero(s);
  }
};
function getExactTime(time) {
  var date = new Date(time * 1000);
  var year = date.getFullYear() + '-';
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var dates = zero(date.getDate()) + ' ';
  var hour = zero(date.getHours()) + ':';
  var min = zero(date.getMinutes()) + ':';
  var second = zero(date.getSeconds());
  return year + month + dates + hour + min + second;
}
var forTimes = exports.forTimes = function forTimes(duration) {
  var time = duration;
  var h = Math.floor(time / 3600);
  var m = Math.floor(time / 60 % 60);
  var s = Math.floor(time % 60);
  if (time < 60) {
    return "00:" + zero(s);
  } else if (time == 60) {
    return zero(1) + ":" + zero(0);
  } else if (60 < time && time < 3600) {
    return zero(m) + ":" + zero(s);
  } else if (time > 3600) {
    return zero(h) + ":" + zero(m) + ":" + zero(s);
  }
};
var time_ms = exports.time_ms = function time_ms(duraction) {
  var min_sec = duraction;
  if (min_sec > 3600) {
    return '开播前30分钟将收到直播通知';
  } else {
    var min = Math.floor(min_sec / 60 % 60);
    var sec = Math.floor(min_sec % 58);
    return "还有" + min + "分钟" + zero(sec) + "秒开播";
  }
};
var conver = exports.conver = function conver(limit) {
  var size = "";
  var limit = limit * 1024;
  if (limit > 10240) {
    if (limit < 104857.6) {
      //如果小于0.1MB转化成KB
      size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 107374182.4) {
      //如果小于0.1GB转化成MB
      size = (limit / 1048576).toFixed(2) + "MB";
    } else {
      //其他转化成GB
      size = (limit / 1073741824).toFixed(2) + "GB";
    }
    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {
      //当小数点后为00时 去掉小数部分
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
  } else {
    return "0KB";
  }
};
var subTxt = exports.subTxt = function subTxt(courseName) {
  var coursetext = courseName;
  if (coursetext.length > 18) {
    return coursetext.substring(0, 18) + '...';
  } else {
    return coursetext;
  }
};
var subNumTxt = exports.subNumTxt = function subNumTxt(courseName, number) {
  var coursetext = courseName;
  var num = number * 2;
  if (coursetext.replace(/[\u4e00-\u9fa5]/g, "**").length <= num) {
    return coursetext;
  } else {
    var len = 0;
    var tmpStr = "";
    for (var i = 0; i < coursetext.length; i++) {
      //遍历字符串
      if (/[\u4e00-\u9fa5]/.test(coursetext[i])) {
        //中文 长度为两字节
        len += 2;
      } else {
        len += 1;
      }
      if (len > num) {
        break;
      } else {
        tmpStr += coursetext[i];
      }
    }
    return tmpStr + " ...";
  }
};
var learnNum = exports.learnNum = function learnNum(number) {
  var learnNumber = parseInt(number);
  if (learnNumber < 10000) {
    return learnNumber;
  } else if (9999 < learnNumber && learnNumber < 100000000) {
    return Math.floor(learnNumber / 10000) + '万';
  } else if (learnNumber > 99999999) {
    return (learnNumber / 100000000).toFixed(1) + '亿';
  }
};
var dateDiff = exports.dateDiff = function dateDiff(timestamp) {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0';
    }
  }
  timestamp = arrTimestamp.join('') * 1;
  var minute = 60000;
  var hour = 3600000;
  var day = 86400000;
  var halfamonth = 1296000000;
  var month = 2592000000;
  var now = new Date().getTime();
  var diffValue = now - timestamp;
  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前';
  }
  // 计算差异时间的量级
  var monthC = diffValue / month;
  var weekC = diffValue / 604800000;
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  // 数值补0方法
  var zero = function zero(value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };
  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return function () {
      var date = new Date(timestamp);
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
    }();
  } else if (monthC >= 1) {
    return parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟前";
  }
  return '刚刚';
};