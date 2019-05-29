// pages/set/set.js
var db = wx.cloud.database();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        user: []
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var _this = this;
        if (options.id) {
            var _db = wx.cloud.database();
            _db.collection("user").where({
                _id: options.id
            }).get({
                success: function success(res) {
                    _this.setData({
                        user: res.data[0]
                    });
                },
                fail: function fail(err) {
                    console.log(err);
                }
            });
        }
    },
    upUser: function upUser(e) {
        var db = wx.cloud.database();
        //打开数据库连接
                var user = e.detail.value;
        this.update(db, user);
        //修改记录
        },
    update: function update(db, user) {
        db.collection("user").doc(user.id).update({
            data: {
                ID: user._id,
                name: user.userName
            },
            success: function success(res) {
                wx.showToast({
                    title: "修改成功"
                });
                wx.navigateTo({
                    url: "../index/index"
                });
            },
            fail: function fail(err) {
                wx.showToast({
                    title: "修改失败"
                });
            }
        });
    }
});