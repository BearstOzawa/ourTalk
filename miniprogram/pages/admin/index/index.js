// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: [],
    user: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection("topic").get({
      success: res => {
        this.setData({
          topic: res.data
        })
      }
    }),
      db.collection("user").get({
        success: res => {
          this.setData({
            user: res.data
          })
        },
        fail: err => {
          wx.showToast({
            icon: "none",
            title: '查询记录失败',
          })
        }
      })
  },
  onTopicDel: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("topic").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad() //删除成功重新加载
      },
      fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log(id)
  },
  onUserDel: function (e) {
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("user").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad()//删除成功重新加载
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
    console.log(id)
  },
  onUserUpdate: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../user/upUser/upUser?id=' + id,
    })
  }
})