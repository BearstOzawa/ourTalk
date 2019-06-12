var db = wx.cloud.database();

Page({
  /**
 * 页面的初始数据
 */
  data: {
    topic: [],
    user: [],
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
    console.log(id)
    console.log(e)
    db.collection("topic").where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          topicId: res.data[0].topicId
        })
        console.log(res.data[0].topicId)
      }
    })
    wx.cloud.callFunction({
      name: 'adminDelTopic',
      data: {
        id: id
      }, success: function success(res) {
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
  }
});