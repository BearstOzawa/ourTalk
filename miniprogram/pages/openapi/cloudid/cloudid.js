// miniprogram/pages/openapi/cloudid/cloudid.js
Page({
    data: {
        weRunResult: "",
        userInfoResult: ""
    },
    onGetWeRunData: function onGetWeRunData() {
        var _this = this;
        wx.getWeRunData({
            success: function success(res) {
                wx.cloud.callFunction({
                    name: "echo",
                    data: {
                        // info 字段在云函数 event 对象中会被自动替换为相应的敏感数据
                        info: wx.cloud.CloudID(res.cloudID)
                    }
                }).then(function(res) {
                    console.log("[onGetWeRunData] 收到 echo 回包：", res);
                    _this.setData({
                        weRunResult: JSON.stringify(res.result)
                    });
                    wx.showToast({
                        title: "敏感数据获取成功"
                    });
                }).catch(function(err) {
                    console.log("[onGetWeRunData] 失败：", err);
                });
            }
        });
    },
    onGetUserInfo: function onGetUserInfo(e) {
        var _this2 = this;
        console.log(e);
        wx.cloud.callFunction({
            name: "openapi",
            data: {
                action: "getOpenData",
                openData: {
                    list: [ e.detail.cloudID ]
                }
            }
        }).then(function(res) {
            console.log("[onGetUserInfo] 调用成功：", res);
            _this2.setData({
                userInfoResult: JSON.stringify(res.result)
            });
            wx.showToast({
                title: "敏感数据获取成功"
            });
        });
    }
});