// pages/set/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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

    if (userId.length == 7) {
      this.setData({
        isAdmin: false     //展示管理中心
      })
    } else {
      this.setData({
        isAdmin: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  // 点击七次进入管理
  intoAdmin: function(e) {
    wx.navigateTo({
      url: '../../admin/index/index'
    })
  },
  // 退出登录 -->清除本地缓存实现
  clearStorage: function() {
    wx.clearStorage({
      success: res => {
        wx.reLaunch({
          url: '../../me/index/index',
        })
        console.log("clear!")
      }
    })
  },
})