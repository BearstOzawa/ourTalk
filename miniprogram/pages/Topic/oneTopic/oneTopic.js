// pages/Topic/Topic/Topic.js
const db = wx.cloud.database()
const _ = db.command
var app = getApp()
const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    comment: [],
    topNum: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        topicId: options.id
      })
      console.log(options.id)
      this.search(options.id)
      var topicId
      wx.setStorageSync("topicId", topicId)
    }

  },
  search: function (id) {
    // let idNum = 0;
    // if (Number(id) || Number(id) == 0)
    //   idNum = Number(id)
    // else
    //   idNum = this.data.topicId;
    id = this.data.topicId
    db.collection('topic').where({
      // topicid: _.eq(idNum)
      topicId: id

    }).get({
      success: res => {
        console.log(res)
        let D = res.data;

        this.setData({
          data: D[0]
        })
      },
      fail: function (e) {
        console.log(e)
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.clearStorageSync('topicId')
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
  // 评论
  addComment: function (e) {
    console.log(e)
    var commentTxt = null;
    this.setData({
      commentTxt: e.detail.value
    })
  },
  confirm: function () {
    const db = wx.cloud.database()
    const _ = db.command

    let userId = wx.getStorageSync('userId')
    // 评论Id
    var commentId = null
    if (!commentId) {
      commentId = this.getCommentId()
    }
    //发送评论
    let d = new Date(), data = {};
    let arr = util.typeC(this.data.data.comment) == 'array' ? this.data.data.comment : new Array(this.data.data.comment);
    var comment;
    if (this.data.commentTxt) {
      data = {
        comment: this.data.commentTxt,
        commentUserName: wx.getStorageSync('userName'),
        commentTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        commentUserId: wx.getStorageSync('userId'),
        commentId: wx.getStorageSync('commentId'),
        commentUserImg: wx.getStorageSync('userImg'),
        topicId: this.data.topicId,
      }
      arr.push(data)

    } else
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })

    if (!userId) {

      wx.showToast({
        title: '您还未登录,请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../../me/index/index',
        })
      }, 1000)
    } else {
      var commentNum = this.data.data.comment.length;
      db.collection('comment').add({
        data: {
          commentId: data.commentId,
          commentUserId: data.commentUserId,
          comment: data.comment,
          commentUserName: data.userName,
          commentTime: data.commentTime,
          commentUserImg: data.commentUserImg,
          topicId: this.data.topicId,
        },
        success: res => {
          console.log('Comment新增成功')
        },
        fail: e => {
          console.log('Comment新增失败')
        }
      })
      wx.cloud.callFunction({
        name: 'comment',
        data: {
          comment: arr,
          topicId: this.data.topicId,
          commentNum: commentNum
        },
        success: res => {
          wx.showToast({
            title: '评论成功',
          })
          console.log('云Comment',res)

          this.search()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '评论失败',
          })
          console.error('云Comment调用失败：', err)
        }
      })
    }
    console.log(data)
  },
  getCommentId: function () {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    // firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "comment";

    var commentId = firstW + (Date.now()) + (Math.random() * 100000).toFixed(0)
    console.log(commentId)
    wx.setStorageSync("commentId", commentId)

    return commentId;
  },

  // 获取滚动条当前位置
  scrolltoupper: function (e) {
    if (e.detail.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
  },
  // //回到顶部
  // goTop: function (e) {  // 一键回到顶部
  //   if (wx.pageScrollTo) {
  //     wx.pageScrollTo({
  //       scrollTop: 0,
  //     })
  //   }
  // },

})