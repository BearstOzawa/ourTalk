// pages/Topic/Topic/Topic.js
var app = getApp();
var db = wx.cloud.database();
var utils = require('../../utils/util.js');
var _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    topicData: {},
    comment: [],
    topNum: 0,
    commentTxt:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    // console.log(options)
    if (options.topicId) {
      this.setData({
        topicId: options.topicId
      });
      // console.log(options.topicId)
      this.search(options.topicId);
      wx.setStorageSync("topicId", this.data.topicId);
    }
    this.isFavorite();
  },
  search: function search(id) {
    var _this = this;
    id = this.data.topicId;
    db.collection("topic").where({
      topicId: id
    }).get({
      success: function success(res) {
        // console.log(res)
        var D = res.data;
        _this.setData({
          data: D[0]
        });
        db.collection("comment").where({
          topicId: id
        }).get({
          success: function success(res) {
            // console.log('mark', res)
            _this.setData({
              comment: res.data
            });
          },
          fail: function fail(e) {
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    this.isFavorite();
  },
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
  // 评论
  addComment: function addComment(e) {
    // console.log(e)
    var commentTxt = null;
    this.setData({
      commentTxt: e.detail.value
    });
  },
  confirm: function confirm() {
    var _this2 = this;
    var db = wx.cloud.database();
    var _ = db.command;
    let userId = wx.getStorageSync("userId");
    // 评论Id
    var commentId = null;
    if (!commentId) {
      commentId = this.getCommentId();
    }
    //发送评论
    var data = {}, topicData = {};
    let arr = this.data.data.comment;
    var comment;
    if (this.data.commentTxt) {
      data = {
        comment: this.data.commentTxt,
        commentUserName: wx.getStorageSync("userName"),
        commentTime: utils.formatTime(new Date()),
        commentUserId: wx.getStorageSync("userId"),
        commentId: wx.getStorageSync("commentId"),
        commentUserImg: wx.getStorageSync("userImg"),
        topicId: this.data.topicId
      },
        topicData = {
          commentId: data.commentId,
          comment: data.comment,
          commentTime: data.commentTime,
          commentUserId: data.commentUserId
        }
      arr.push(topicData);
    } else wx.showToast({
      title: "请填写内容",
      icon: "none"
    });
    if (!userId) {
      wx.showToast({
        title: "您还未登录,请先登录",
        icon: "none"
      });
      setTimeout(function () {
        wx.switchTab({
          url: "../../me/index/index"
        });
      }, 1000);
    } else {
      db.collection("comment").add({
        data: {
          commentId: data.commentId,
          commentUserId: data.commentUserId,
          comment: data.comment,
          commentUserName: data.commentUserName,
          commentTime: data.commentTime,
          commentUserImg: data.commentUserImg,
          topicId: this.data.topicId
        },
        success: function success(res) {
          // console.log('Comment新增成功')

        },
        fail: function fail(e) {
          // console.log('Comment新增失败')
        }
      });
      var commentNum = this.data.data.comment.length;
      wx.cloud.callFunction({
        name: "addTopicComment",
        data: {
          comment: arr,
          topicId: this.data.topicId,
          commentNum: commentNum
        },
        success: function success(res) {
          wx.showToast({
            title: "评论成功"
          });
          console.log('云addTopicComment', res)
          _this2.search();
          _this2.setData({
            commentTxt: ''
          })

        },
        fail: function fail(err) {
          wx.showToast({
            icon: "none",
            title: "评论失败"
          });
          // console.error('云Comment调用失败：', err)
        }
      });
    }
    // console.log(data)
    // this.onLoad()
  },
  getCommentId: function getCommentId() {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    // firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "comment";
    var commentId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
    // console.log(commentId)
    wx.setStorageSync("commentId", commentId);
    return commentId;
  },


  // 获取滚动条当前位置
  scrolltoupper: function scrolltoupper(e) {
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
  goTop: function goTop(e) {
    // 一键回到顶部
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

  //收藏
  addFavorite: function addFavorite() {
    var userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({
        title: "您还未登录,请先登录",
        icon: "none"
      });
      setTimeout(function () {
        wx.switchTab({
          url: "../../me/index/index"
        });
      }, 1000);
    } else {
      this.isFavorite();
      if (this.data.isFavorite == 0) {
        var openId, topicId, favoriteTime;
        wx.cloud.callFunction({
          name: "addMeFavorite",
          data: {
            topicId: this.data.topicId,
            topicName: this.data.data.topicName,
            openId: wx.getStorageSync('openId'),
            favoriteTime: utils.formatTime(new Date()),
          },
          success: function success(res) {
            wx.showToast({
              title: "收藏成功"
            })
          }
        })
        this.onShow();
      } else {
        wx.showToast({
          icon: "none",
          title: "已收藏"
        })
      }
    }
  },
  isFavorite: function isFavorite() {
    var openId = wx.getStorageSync('openId'),
      topicId = wx.getStorageSync('topicId');
    let that = this;
    db.collection("favorite")
      .where({
        _openid: openId,
        favorite: {
          topicId: topicId
        }
      })
      .get({
        success: function success(res) {
          console.log(res)
          if (res.data.length > 0) {
            that.setData({
              isFavorite: 1
            })
          } else {
            that.setData({
              isFavorite: 0
            })
          }
        }
      })
  },
  //点击预览
  imgBig: function imgBige() {
    var src = this.data.data.image;
    wx.cloud.getTempFileURL({
      fileList: [src],
      success: res => {
        this.setData({
          urls: [res.fileList],
        })
      },
      fail: err => {
        // handle error
      }
    })
  }
});