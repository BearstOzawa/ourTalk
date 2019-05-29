// pages/me/myComment/myComment.js
var db = wx.cloud.database();

var _ = db.command;

Page({
    /**
   * 页面的初始数据
   */
    data: {
        data: [],
        userImg: wx.getStorageSync("userImg"),
        userName: wx.getStorageSync("userName")
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var _this = this;
        var openId = wx.getStorageSync("openId"), userId = wx.getStorageSync("userId");
        if (!userId) {
            wx.showToast({
                title: "您还未登录,请先登录~",
                icon: "none"
            });
            setTimeout(function() {
                wx.switchTab({
                    url: "../../me/index/index"
                });
            }, 1500);
        } else {
            // console.log(userId)
        }
        wx.showLoading({
            title: "加载中"
        });
        db.collection("comment").where({
            _openid: openId
        }).orderBy("commentTime", "desc").get({
            success: function success(res) {
                wx.hideLoading();
                _this.setData({
                    data: res.data
                });
                // console.log(res)
                        },
            fail: function fail(e) {
                wx.hideLoading();
                wx.showToast({
                    title: "获取评论错误",
                    icon: "none"
                });
            }
        });
    }
});