const config = require('../config');
const api = require('./interface.js')

export const request = function (url, method, data, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BASE_API + url,
      header: header || { 'Content-Type': 'application/json;charset=UTF-8' },
      method: method,
      data: data,
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data)
        }
      },
      fail: function (res) {
        reject(res);
      }
    })
  })
}

export const login = function () {
  try {
    wx.removeStorageSync()
  } catch (e) {}
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        let code = res.code;
        let data = {
          code: code
        }
        request(api.login, "POST", data).then((res) => {
          if (!res.code) {
            // try {
            //   wx.setStorageSync('TOKEN', res.token)
            // } catch (e) {
            //   reject(JSON.stringify(e));
            // }
          }
          resolve(res)
        }).catch((errMsg) => {
          reject(errMsg)
        });
      }
    })
  });
};
