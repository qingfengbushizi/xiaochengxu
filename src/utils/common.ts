import Taro from '@tarojs/taro'

function zero(obj){
  if(obj<10) return "0" +""+ obj;
      else return obj;
}

export const formatNumber = (n: number | string) : string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const logHistory = (courseId) => {
  let historys = Taro.getStorageSync("history");

  let cstr = courseId + '';
  let arr = [];
  if (historys != "") {
    arr = historys.split(",");
  }

  if (arr.indexOf(cstr) == -1) {
    arr.push(cstr);
  }

  try
  {
    Taro.setStorageSync("history", arr.join(","));
  } catch(e) {
    console.info(e);
  }
}

export const liveday = (beg_time) => {
    var nowTime = new Date();
    var endTime = new Date(beg_time * 1000);


    const year = endTime.getFullYear()
    const month = endTime.getMonth() + 1
    const day = endTime.getDate()
    const hour = endTime.getHours()
    const minute = endTime.getMinutes()

    const nowday = nowTime.getDate();

      
    var t = endTime.getTime() - nowTime.getTime();
    var d=Math.floor(t/1000/60/60/24);

    var type_day = day - nowday 


    if(t > 1){
      if (type_day === 0){
          return '今天 ' + zero(hour) + ':' + zero(minute) + ' 开播'
        } else if (type_day === 1){
            return '明天 ' + zero(hour) + ':' + zero(minute) + ' 开播'
        } else if (type_day > 1){
            return year+'-' + zero(month) +'-' + zero(day) +' ' + zero(hour) + ':' + zero(minute) + ' 开播'
        }
    } else {
        return '即将开始'
    }
    
}


export const chatTime = (time) => {
  var nowTime = new Date();
  var endTime = new Date(time * 1000);


  const year = endTime.getFullYear()
  const month = endTime.getMonth() + 1
  const day = endTime.getDate()
  const hour = endTime.getHours()
  const minute = endTime.getMinutes()

  const nowday = nowTime.getDate();

      
  var t = nowTime.getTime() - endTime.getTime() 
  var d = Math.floor(t/1000/60/60/24)

  var type_day =nowday  - day 
  if(t > 1){
    if (type_day === 0){
        return  zero(hour) + ':' + zero(minute) 
    } else if (type_day === 1){
          return '昨天 ' + zero(hour) + ':' + zero(minute)
      } else if (type_day > 1){
          return year+'-' + zero(month) +'-' + zero(day) +' ' + zero(hour) + ':' + zero(minute) 
      }
  } else {
      return zero(hour) + ':' + zero(minute) 
  }
}


export const isHistory = (courseId) => {
  let historys = Taro.getStorageSync("history");
  let cstr = courseId + '';
  let arr = historys.split(",");
  return arr.indexOf(cstr) >= 0;
}



// 格式化播放次数
export const formatCount = (times) => {
  let formatTime: any = 0
  times = times ? Number(times) : 0
  switch (true) {
    case times > 100000000 :
      formatTime = `${(times / 100000000).toFixed(1)}亿`
      break
    case times > 100000 :
        formatTime = `${(times / 10000).toFixed(1)}万`
        break  
    default:
      formatTime = times    
  }
  return formatTime
}

// 格式化时间戳为日期
export const formatTimeStampToTime = (timestamp) => {
  const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const year = date.getFullYear();
  const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${year}-${month}-${day}`
}




// 格式化 日期

  export const formatDate = (datestamp) => { 
    const datestr = datestamp

    var year = datestr.getFullYear()
    var month = datestr.getMonth() + 1
    var day = datestr.getDate()

    return [year, month, day].map(formatNumber).join('-')
}


// 格式化时间
export const forTime = (duration) => {
  const time = duration;
  const  h = Math.floor(time / 3600);
  const  m = Math.floor((time / 60 % 60));
  const  s = Math.floor((time % 60));
  

  if(time < 60){
      return   s + "秒";
  } else if(60 < time  && time < 3600){
      return  m + "分钟" + s + "秒";
  } else if (time > 3600){
      return  h + "小时" + m + "分钟" + s + "秒";
  }
}


// 格式化时间
export const forTimer = (duration) => {
  const time = duration;
  const  h = Math.floor(time / 3600);
  const  m = Math.floor((time / 60 % 60));
  const  s = Math.floor((time % 60));
  

  if(time < 60){
      return  '00 : ' + zero(s) 
  } else if(60 < time  && time < 3600){
      return  zero(m) + " : " + zero(s) ;
  } else if (time > 3600){
      return  zero(h) + ":" + zero(m) + ":" + zero(s) ;
  }
}



export function getExactTime(time) {
  var date = new Date(time* 1000);
  var year = date.getFullYear() + '-';
  var month = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
  var dates = zero(date.getDate()) + ' ';
  var hour = zero(date.getHours()) + ':';
  var min = zero(date.getMinutes()) + ':';
  var second = zero(date.getSeconds());
  return year + month + dates + hour + min + second ;
}

export const forTimes = (duration) => {
    const time = duration;
    const  h = Math.floor(time / 3600);
    const  m = Math.floor((time / 60 % 60));
    const  s = Math.floor((time % 60));
    

    if(time < 60){
        return  "00:" + zero(s) ;
    } else if(time == 60 ){
      return  zero(1) + ":" + zero(0);
    } else if(60 < time  && time < 3600){
        return  zero(m) + ":" + zero(s);
    } else if (time > 3600){
        return  zero(h) + ":" + zero(m) + ":" + zero(s) ;
    }
}

export const time_ms = (duraction) => {
    const min_sec = duraction ;

    if(min_sec > 3600){
        return '开播前30分钟将收到直播通知'
    } else {
        const min = Math.floor((min_sec / 60 % 60));
        const sec = Math.floor((min_sec % 58))
        return  "还有" + min + "分钟" + zero(sec) + "秒开播";
    }

}




export const  conver = (limit ) => {
    var size = "";
    var limit:any = limit * 1024;
    if(limit > 10240){
      if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
          size = (limit / 1024).toFixed(2) + "KB";			
      }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
          size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      }else{ //其他转化成GB
          size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      var sizestr = size + ""; 
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if(dec == "00"){//当小数点后为00时 去掉小数部分
          return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
      }
      return sizestr;
    } else {
        return 0 + 'KB'
    }
    
}


export const subTxt  = (courseName)  => {
    const coursetext = courseName

    if(coursetext.length > 18){
        return coursetext.substring(0,18) + '...' 
    } else {
        return coursetext
    }
}

export const subNumTxt  = (courseName, number)  => {
  const coursetext = courseName
  const num = number * 2

  if (coursetext.replace(/[\u4e00-\u9fa5]/g, "**").length <= num) {
      return coursetext;
  } else {
    let len = 0;
    let tmpStr = "";
        for (let i = 0; i < coursetext.length; i++) {//遍历字符串
            if (/[\u4e00-\u9fa5]/.test(coursetext[i])) {//中文 长度为两字节
                len += 2;
            }
            else {
                len += 1;
            }
            if (len > num) {
                break;
            }
            else {
                tmpStr += coursetext[i];
            }
        }
    return tmpStr + " ...";
  }
}

export const learnNum  = (number)  => {
    const learnNumber = parseInt(number)
    if(learnNumber < 10000){
        return learnNumber;
    } else if ( 9999 < learnNumber  && learnNumber < 100000000){
        return Math.floor(learnNumber/10000) + '万';
    } else if (learnNumber > 99999999){
        return (learnNumber/100000000).toFixed(1) + '亿';
    }
} 

export const  dateDiff = (timestamp) => {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0';
      }
  }
  timestamp = arrTimestamp.join('') * 1;

  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
      return '不久前';
  }

  // 计算差异时间的量级
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  // 数值补0方法
  var zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  // 使用
  if (monthC > 12) {
      // 超过1年，直接显示年月日
      return (function () {
          var date = new Date(timestamp);
          return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
      })();
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