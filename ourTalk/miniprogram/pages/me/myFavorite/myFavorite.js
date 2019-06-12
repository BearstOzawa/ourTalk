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
  onLoad: function onLoad(options) {
    var that = this,
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
    // wx.showLoading({
    //   title: "加载中"
    // })
    wx.cloud.callFunction({
      name: "getMeFavorite",
      data: {
        openId: openId
      },
      success: function complete(res) {
        // console.log(res)
        that.setData({
          data: res.result.data[0].favorite
        });
      },
      fail: function fail(e) {
        wx.showToast({
          title: "获取失败",
          icon: "none"
        })
      }
    })
  },
  //oneTopic
  toOneTopic: function toOneTopic(e) {
    // console.log(e)
    wx.navigateTo({
      url: "../../topic/oneTopic/oneTopic?topicId=" + e.currentTarget.dataset.id
    });
  },
  delMeFavorite: function delMeFavorite(e){
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'userDelFavorite',
      data: {
        openId: wx.getStorageSync('openId'),
        topicId: id
      },
      success: function success(res) {
        wx.showToast({
          title: "删除成功"
        });
        _this.onLoad();
        //删除成功重新加载
      }
    })
  }
})