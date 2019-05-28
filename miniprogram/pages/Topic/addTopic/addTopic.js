var app = getApp()
const db = wx.cloud.database()
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const userName = userInfo.nickName
        const userImg = userInfo.avatarUrl
        console.log(res.userInfo)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // wx.checkSession({
    //   success: function () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //     return;
    //   },
    //   fail: function () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     wx.navigateTo({
    //       url: '../../me/index/index',
    //     })
    //   }
    // })
    var topicId = null
    if (!topicId) {
      topicId = this.getTopicId()
    }
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



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync("topicId")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  textInput: function (e) {
    console.log(e)
    this.setData({
      text: e.detail.detail.value
    })
  },

  addTopic: function () {
    let d = new Date();
    var data = {
      topicName: this.data.text,
      userId: wx.getStorageSync('userId'),
      topicUser: wx.getStorageSync('userName'),
      topicUserImg: wx.getStorageSync('userImg'),
      topicCommentNum: 0,
      topicTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      comment: [],
      topicId: wx.getStorageSync('topicId')
    }
    console.log(data)

    if (data.topicName) {
      db.collection('topic').add({
        data: data,
        success: res => {
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(() => {

            wx.switchTab({
              url: '../index/index',
            })
          }, 1000)
        },
        fail: e => {
          wx.showToast({
            title: '发布错误',
          })
          console.log(e)
        }
      })
    } else {
      wx.showToast({
        title: '请填写文字',
        icon: 'none'
      })
    }

  },
  getTopicId: function () {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    // firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "topic";

    var topicId = firstW + (Date.now()) + (Math.random() * 100000).toFixed(0)
    console.log(topicId)
    wx.setStorageSync("topicId", topicId)

    return topicId;
  },
})