var db = wx.cloud.database();
var _ = db.command;
var utils = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
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
    var topicId = null;
    if (!topicId) {
      topicId = this.getTopicId();
    }
    var userId = wx.getStorageSync("userId");
    if (!userId) {
      wx.showToast({
        title: "您还未登录,请先登录~",
        icon: "none"
      });
      setTimeout(function() {
        wx.switchTab({
          url: "../../me/index/index"
        });
      }, 1500);
    } else {
      // console.log(userId)
    }

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    wx.removeStorageSync("topicId");
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {},
  textInput: function textInput(e) {
    // console.log(e)
    this.setData({
      text: e.detail.detail.value
    });
  },
  addTopic: function addTopic() {
    var data = {
      image: new Array(app.globalData.fileID), //将图片储存为数组类型
      topicName: this.data.text,
      userId: wx.getStorageSync("userId"),
      topicUser: wx.getStorageSync("userName"),
      topicUserImg: wx.getStorageSync("userImg"),
      topicCommentNum: 0,
      topicLikeNum: 0,
      topicTime: utils.formatTime(new Date()),
      comment: [],
      topicId: wx.getStorageSync("topicId")
    };
    if (data.topicName) {
      db.collection("topic").add({
        data: data,
        success: function success(res) {
          wx.showToast({
            title: "发布成功"
          });
          setTimeout(function() {
            wx.switchTab({
              url: "../index/index"
            });
          });
        },
        fail: function fail(e) {
          wx.showToast({
            title: "发布错误"
          });
          // console.log(e)
        }
      });
    } else {
      wx.showToast({
        title: "请填写文字",
        icon: "none"
      });
    }
  },
  getTopicId: function getTopicId() {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    // firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "topic";
    var topicId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
    // console.log(topicId)
    wx.setStorageSync("topicId", topicId);
    return topicId;
  },
  // 上传图片
  imgUp() {
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        that.setData({
          imgUrl: filePath
        })
        const name = Math.random() * 1000000;
        const cloudPath = 'topicImg/' + name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, //云存储图片名字
          filePath, //临时路径
          success: res => {
            // console.log('上传成功：', res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          },
          fail: e => {
            // console.error('上传失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
});