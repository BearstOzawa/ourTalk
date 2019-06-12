// pages/me/myComment/myComment.js
var db = wx.cloud.database();
var _ = db.command;
const app = getApp()
Page({
  /**
 * 页面的初始数据
 */
  data: {
    data: [],
    userImg: wx.getStorageSync("userImg"),
    userName: wx.getStorageSync("userName"),
    height: app.globalData.height,

  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function onLoad() {
    var _this = this,
      userImg = wx.getStorageSync("userImg"),
      userName = wx.getStorageSync("userName"),
      openId = wx.getStorageSync("openId"),
      userId = wx.getStorageSync("userId");
    if (!userId) {
      wx.showToast({
        title: "您还未登录,请先登录~",
        icon: "none"
      });
      setTimeout(function () {
        wx.switchTab({
          url: "../../me/index/index"
        });
      }, 1500);
    }
    wx.showLoading({
      title: "加载中"
    });
    db.collection("comment")
      .where({
        _openid: openId
      })
      .orderBy("commentTime", "desc")
      .get({
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
  },
  //oneTopic
  toOneTopic: function toOneTopic(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    var commentId = e.currentTarget.dataset.id

    db.collection("comment")
      .where({
        commentId: commentId
      })
      .get({
        success: function success(res) {
          // console.log(res)
          // console.log(res.data[0].topicId)
          wx.navigateTo({
            url: "../../topic/oneTopic/oneTopic?topicId=" + res.data[0].topicId
          });
        },
      })

  },
  back: function (e) {
    // console.log(e.detail.back)
  },
  home: function (e) {
    // console.log(e.detail.home)
  }
})