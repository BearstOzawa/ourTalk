// pages/comment/comment.js
var db = wx.cloud.database();

var _ = db.command;

Page({
    /**
   * 页面的初始数据
   */
    data: {
        defaultImg: "../../images/me/def.png",
        data: [],
        userImg: wx.getStorageSync("avatar"),
        userName: wx.getStorageSync("username")
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        this.search();
    },
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {},
    search: function search() {
        var _this = this;
        var openId = wx.getStorageSync("openId");
        wx.showLoading({
            title: "刷新中..."
        });
        db.collection("comment").where({
            _openid: _.eq(openId)
        }).get({
            success: function success(res) {
                wx.hideLoading();
                _this.setData({
                    data: res.data
                });
            },
            fail: function fail(e) {
                wx.hideLoading();
                wx.showToast({
                    title: "获取评论错误",
                    icon: "none"
                });
            }
        });
    },
    onPullDownRefresh: function onPullDownRefresh() {
        this.search();
    }
});