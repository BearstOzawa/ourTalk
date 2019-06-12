var app = getApp();
var db = wx.cloud.database();
var utils = require('../../utils/util.js');
var _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topic: [],
    user: [],
    height: app.globalData.height,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var _this = this;
    var db = wx.cloud.database();
    var _ = db.command;
    db.collection("topic").get({
      success: function success(res) {
        _this.setData({
          topic: res.data
        });
      }
    }), db.collection("user").get({
      success: function success(res) {
        _this.setData({
          user: res.data
        });
      }
    }), db.collection("comment").get({
      success: function success(res) {
        _this.setData({
          comment: res.data
        });
      },
      fail: function fail(err) {
        wx.showToast({
          icon: "none",
          title: "查询失败"
        });
      }
    });
  },
  // 删除主题
  onTopicDel: function onTopicDel(e) {
    var _this2 = this;
    var id = e.currentTarget.dataset.id;
    // console.log(id)
    // console.log(e)
    db.collection("topic").where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          topicId: res.data[0].topicId
        })
        // console.log(res.data[0].topicId)
      }
    })
    wx.cloud.callFunction({
      name: 'adminDelTopic',
      data: {
        id: id
      },
      success: function success(res) {
        wx.showToast({
          title: "删除成功"
        });
      }
    });
    _this2.onLoad();
    //删除成功重新加载
  },
  // 删除用户
  onUserDel: function onUserDel(e) {
    var _this3 = this;
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'adminDelUser',
      data: {
        id: id,
      },
      success: function success(res) {
        wx.showToast({
          title: "删除成功"
        });
        _this3.onLoad();
        //删除成功重新加载
      }
    })
  },
  //删除评论
  onCommentDel: function onCommentDel(e) {
    var _this4 = this;
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'adminDelComment',
      data: {
        id: id,
      },
      success: function success(res) {
        wx.showToast({
          title: "删除成功"
        });
        _this4.onLoad();
        //删除成功重新加载
      }
    })
  },
  // 跳转修改用户
  onUserUpdate: function onUserUpdate(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../user/upUser/upUser?id=" + id
    });
  },
  titleInput: function titleInput(e) {
    // console.log(e)
    this.setData({
      title: e.detail.detail.value
    })

  },
  adminInput: function adminInput(e) {
    // console.log(e)
    this.setData({
      admin: e.detail.detail.value
    })
  },
  noticeInput: function noticeInput(e) {
    // console.log(e)
    this.setData({
      notice: e.detail.detail.value
    })
  },
  noticeSend: function noticeSend() {
    wx.cloud.callFunction({
      name: "addNotice",
      data: {
        title: this.data.title,
        admin: this.data.admin,
        notice: this.data.notice,
        time: utils.formatTime(new Date()),
      },
      success: function success(res) {
        wx.showToast({
          title: "发布成功"
        });
        // console.log('云addNotice', res)
        let _this5 = this;
        _this5.setData({
          notice:'',
          admin:'',
          title:''
        })
      },
      fail: function fail(err) {
        wx.showToast({
          icon: "none",
          title: "发布失败"
        });
      }
    })
    this.onLoad();
  }
});