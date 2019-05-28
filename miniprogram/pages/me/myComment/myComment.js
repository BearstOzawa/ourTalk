// pages/me/myComment/myComment.js
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
  onLoad: function(options) {
    // let openId = wx.getStorageSync('openId')
    let userId = wx.getStorageSync('userId')
    wx.showLoading({
      title: '加载中',

    })
    db.collection('comment').where({
        // _openid: openId
        userId: 'user155886193727779626'
      }).orderBy('commentTime', 'desc')
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