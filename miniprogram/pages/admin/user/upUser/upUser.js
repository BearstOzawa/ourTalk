var db = wx.cloud.database();

Page({
  /**
 * 页面的初始数据
 */
  data: {
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function onLoad(options) {
    var that = this;
    // console.log(options)
    // console.log(options.id)
    if (options.id) {
      db.collection("user")
      .where({
        _id: options.id
      }).get({
        success: function success(res) {
          console.log(res)
          that.setData({
            user:res.data[0],
          });
        },
        fail: function fail(err) {
          console.log(err);
        }
      });
    }
  },
  upUser: function upUser(e) {
    var user = e.detail.value;
    console.log(user)
    console.log(this.data.user)
    wx.cloud.callFunction({
      name: 'adminUpUser',
      data: {
        id: this.data.user._id,
        userId: user.id
      }, success: function (res) {
        console.log(res)
        wx.showToast({
          title: "修改成功"
        });
        wx.navigateTo({
          url: "../../index/index"
        });
      },
      fail: function fail(err) {
        wx.showToast({
          title: "修改失败"
        });
      }
    });
  },
  update: function update(db, user) {
    // db.collection("user").doc(user.id).update({
    //     data: {
    //         ID: user._id,
    //         name: user.userName
    //     },
  }
});