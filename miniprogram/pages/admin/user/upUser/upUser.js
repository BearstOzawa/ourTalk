// pages/set/set.js
const db = wx.cloud.database() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("user").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            user: res.data[0]//返回的是一个数组，取第一个
          })
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },
  upUser: function (e) {
    const db = wx.cloud.database()//打开数据库连接
    let user = e.detail.value
      this.update(db, user)  //修改记录
  }, 
  update: function (db, user) {
    db.collection("user").doc(user.id).update({
      data: {
        ID: user._id,
        name: user.userName,
      }, success: res => {
        wx.showToast({
          title: '修改成功',
        })
        wx.navigateTo({
          url: '../index/index',
        })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  }

})
