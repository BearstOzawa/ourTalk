Page({
  /**
 * 页面的初始数据
 */
  data: {
    topNum: 0
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function onLoad(options) { },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function onReady() { },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function onShow() {
    var _this = this;
    wx.cloud.init({
      traceUser: true
    });
    wx.cloud.callFunction({
      name: "getNewTopic",
      complete: function complete(res) {
        // console.log("getNewTopic", res)
        _this.setData({
          topic: res.result.data
        });
      }
    });
  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function onHide() { },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function onUnload() { },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function onPullDownRefresh() { },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function onReachBottom() { },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function onShareAppMessage() { },
  hotList: function hotList() {
    var _this2 = this;
    wx.cloud.init({
      traceUser: true
    });
    wx.cloud.callFunction({
      name: "getHotTopic",
      complete: function complete(res) {
        // console.log("getHotTopic",res)
        _this2.setData({
          topic: res.result.data
        });
        return res;
      }
    });
  },
  newList: function newList() {
    var _this3 = this;
    wx.cloud.init({
      traceUser: true
    });
    wx.cloud.callFunction({
      name: "getNewTopic",
      complete: function complete(res) {
        // console.log("getNewTopic", res)
        _this3.setData({
          topic: res.result.data
        });
        return res;
      }
    });
  },
  addTopic: function addTopic() {
    wx.navigateTo({
      url: "../addTopic/addTopic"
    });
  },
  //oneTopic
  toOneTopic: function toOneTopic(e) {
    wx.navigateTo({
      url: "../oneTopic/oneTopic?topicId=" + e.currentTarget.dataset.id
    });
  },
  // 获取滚动条当前位置
  scrolltoupper: function scrolltoupper(e) {
    if (e.detail.scrollTop > 100) {
      // console.log(e)
      this.setData({
        floorStatus: true
      });
    } else {
      this.setData({
        floorStatus: false
      });
    }
  },
  //回到顶部
  goTop: function goTop(e) {
    // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
  },
  tabChange: function tabChange(res) {
    var key = res.detail.currentIndex;
    var res;
    // console.log(key)
    if (key == 1) {
      res = this.hotList();
    } else {
      res = this.newList();
    }
  },
  upBtn: function upBtn(res) {
    var key = res.detail.currentIndex;
    var that = this;
    if (key == 1) {
      that.hotList();
      that.goTop();
    } else {
    that.newList();
    that.goTop();
    }
  }
});