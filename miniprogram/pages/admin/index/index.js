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
    onLoad: function onLoad(options) {
        var _this = this;
        var db = wx.cloud.database();
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
            },
            fail: function fail(err) {
                wx.showToast({
                    icon: "none",
                    title: "查询失败"
                });
            }
        });
    },
    onTopicDel: function onTopicDel(e) {
        var _this2 = this;
        var id = e.currentTarget.dataset.id;
        var db = wx.cloud.database();
        db.collection("topic").doc(id).remove({
            success: function success(res) {
                wx.showToast({
                    title: "删除成功"
                });
                _this2.onLoad();
                //删除成功重新加载
                                db.collection("comment").doc(id).remove({
                    success: function success(res) {
                        wx.showToast({
                            title: "删除成功"
                        });
                    }
                });
            }
        });
        console.log(id);
    },
    onUserDel: function onUserDel(e) {
        var _this3 = this;
        var id = e.currentTarget.dataset.id;
        var db = wx.cloud.database();
        db.collection("user").doc(id).remove({
            success: function success(res) {
                wx.showToast({
                    title: "删除成功"
                });
                _this3.onLoad();
                //删除成功重新加载
                        }
        });
        console.log(id);
    },
    onUserUpdate: function onUserUpdate(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../user/upUser/upUser?id=" + id
        });
    }
});