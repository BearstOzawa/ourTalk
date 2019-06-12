App({
  //全局数据
  globalData: {
    statusBarHeight: 0,
    titleBarHeight: 0
  },
  onLaunch: function onLaunch() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "ourtalk",
        //环境ID，
        traceUser: true
      });
    }
  },
});