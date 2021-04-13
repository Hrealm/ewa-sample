const config = require('../../config');

export const request = function (path, method, data, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BASE_API + path,
      header: header || {},
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


export function login() {

  return config;
}


