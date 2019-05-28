// pages/comment/comment.js
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultImg: '../../images/me/def.png',
    data: [],
    userImg: wx.getStorageSync('avatar'),
    userName: wx.getStorageSync('username')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  search: function () {
    let openId = wx.getStorageSync('openId')
    wx.showLoading({
      title: '刷新中...',

    })
    db.collection('comment').where({
      _openid: _.eq(openId)
    }).get({
      success: res => {
        wx.hideLoading()
        this.setData({
          data: res.data
        })
      },
      fail: e => {
        wx.hideLoading()
        wx.showToast({
          title: '获取评论错误',
          icon: 'none'
        })
      }

    })

  },
  onPullDownRefresh: function () {
    this.search()
  },
  
})