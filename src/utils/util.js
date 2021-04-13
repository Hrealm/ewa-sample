const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 提示错误信息
function isError(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ''
  })
}

// 已经格式化的日期字符串转时间戳 例如：2014-04-23 18:55:49
function datestrToTimestamp(dateStr) {
  var date = '';
  if (getApp().globalData.platform == 'android') {
    date = new Date(dateStr);
    return date.getTime() / 1000;
  } else if (getApp().globalData.platform == 'ios') {
    date = new Date(dateStr.replace(/-/g, '/'));
    return date.getTime() / 1000;
  } else{
    date = new Date(dateStr);
    return date.getTime() / 1000;
  }
}

// 时间戳转日期字符串
function timestampToDatestr(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

// 节流函数
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  formatTime: formatTime,
  trim: trim,
  isError: isError,
  clearError: clearError,
  datestrToTimestamp,
  timestampToDatestr,
  throttle
};
