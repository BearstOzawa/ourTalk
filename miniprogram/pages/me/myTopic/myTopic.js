// pages/me/myTopic/myTopic.js
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    userImg: wx.getStorageSync('userImg'),
    userName: wx.getStorageSync('userName')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({
        title: '您还未登录,请先登录~',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../../me/index/index',
        })
      }, 1500)
    } else {
      console.log(userId)
    }
    // let openId = wx.getStorageSync('openId')
    wx.showLoading({
      title: '加载中',

    })
    db.collection('topic').where({
      // _openid: openId
      userId: 'user155886193727779626'
    }).orderBy('topicTime', 'desc')
      .get({
        success: res => {
          wx.hideLoading()
          this.setData({
            data: res.data
          })
          console.log(res)
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
})