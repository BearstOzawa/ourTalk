// pages/userConsole/userConsole.js
Page({
    data: {
        openid: ""
    },
    onLoad: function onLoad(options) {
        this.setData({
            openid: getApp().globalData.openid
        });
    }
});