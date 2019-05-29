// pages/me/index/index.js
var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        userInfoGridStatus: "false",
        openid: "",
        isHide: true
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        this.getOpenid();
        var openid = this.data.openid, userId = wx.getStorageSync("userId"), userImg = wx.getStorageSync("userImg"), userName = wx.getStorageSync("userName");
        if (userId) {
            this.setData({
                isHide: false,
                userName: userName,
                userImg: userImg,
                userId: userId
            });
        }
    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow(options) {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    onHelpClick: function onHelpClick() {
        wx.navigateTo({
            url: "../../About/meAbout/meAbout"
        });
    },
    onSetClick: function onSetClick() {
        wx.navigateTo({
            url: "../../set/index/index"
        });
    },
    //授权
    getUserInfoClick: function getUserInfoClick(e) {
        var _this = this;
        console.log(e);
        var d = e.detail.userInfo;
        this.setData({
            userImg: d.avatarUrl,
            userName: d.nickName,
            isHide: false
        });
        wx.setStorageSync("userName", d.nickName);
        wx.setStorageSync("userImg", d.avatarUrl);
        var db = wx.cloud.database();
        var _ = db.command;
        db.collection("user").where({
            _openid: this.data.openid
        }).get({
            success: function success(res) {
                console.log("查询用户:", res);
                if (res.data && res.data.length > 0) {
                    console.log("已存在");
                    wx.setStorageSync("userId", res.data[0].userId);
                    wx.setStorageSync("openId", res.data[0]._openid);
                    console.log(res.data[0].userId);
                } else {
                    setTimeout(function() {
                        var userImg = d.avatarUrl, userName = d.nickName;
                        var userId;
                        if (!userId) {
                            userId = _this.getUserId();
                        }
                        db.collection("user").add({
                            data: {
                                userId: userId,
                                userImg: userImg,
                                userName: userName,
                                iv: d.iv
                            },
                            success: function success() {
                                wx.showToast({
                                    title: "注册成功"
                                });
                                console.log(data);
                                console.log("用户新增成功");
                                db.collection("users").where({
                                    userId: userId
                                }).get({
                                    success: function success(res) {
                                        wx.setStorageSync("openId", res.data[0]._openid);
                                    },
                                    fail: function fail(err) {
                                        console.log("openId缓存失败");
                                    }
                                });
                            }
                        });
                    }, 100);
                }
            }
        });
        this.onLoad();
    },
    // 获取用户openid
    getOpenid: function getOpenid() {
        var _this2 = this;
        // let that = this;
                wx.cloud.callFunction({
            name: "getOpenId",
            complete: function complete(res) {
                console.log("云函数获取到的openid: ", res.result.openId);
                var openid = res.result.openId;
                _this2.setData({
                    openid: openid
                });
                console.log(_this2.data.openid);
            }
        });
    },
    getUserId: function getUserId() {
        // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
        //   firstW = w[parseInt(Math.random() * (w.length))];
        var firstW = "user";
        var userId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
        console.log(userId);
        wx.setStorageSync("userId", userId);
        return userId;
    },
    toMyComment: function toMyComment(e) {
        wx.navigateTo({
            url: "../myComment/myComment?userId=" + e.currentTarget.dataset.userId
        });
    },
    toMyTopic: function toMyTopic(e) {
        wx.navigateTo({
            url: "../myTopic/myTopic?userId=" + e.currentTarget.dataset.userId
        });
    }
});