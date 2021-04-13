const { enableState, createStore } = require('ewa'); 

// 参数支持：
//   opts: 参数对象
//     debug: 是否开启 debug 模式，支持3种参数： true, 'page', 'component', 默认为 false
//     component: 是否开启 component 支持, 默认为 true
//     page: 是否开启 page 支持, 默认为 true
//     overwriteArrayOnDeleted: 是否在数组发生删除操作是覆盖整个数组 true 或者 false, 默认为 true
//     autoSync: 是否在 调用 setData 时自动同步 state, 默认为 true; 如果关闭此操作，在同一个页面或组件中混用 setState 或 setData 的时候，可能会导致BUG, 也可以手动调用 this.syncState() 来手动同步
enableState({
  debug: true,
  component: true,
  page: true,
  overwriteArrayOnDeleted: true,
  autoSync: true
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: createStore ({
    userInfo: null
  })
});
