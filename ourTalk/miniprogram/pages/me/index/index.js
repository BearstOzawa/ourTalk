// pages/me/index/index.js
var app = getApp();

Page({
  /**
 * 页面的初始数据
 */
  data: {
    userInfoGridStatus: "false",
    openid: "",
    isHide: true,
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function onLoad(options) {
    this.getOpenid();
    var openid = this.data.openid,
      userId = wx.getStorageSync("userId"),
      userImg = wx.getStorageSync("userImg"),
      userName = wx.getStorageSync("userName");
    if (userId) {
      this.setData({
        isHide: false,
        userName: userName,
        userImg: userImg,
        userId: userId
      });
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function onShow(options) {

  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function onUnload() { },
  onHelpClick: function onHelpClick() {
    wx.navigateTo({
      url: "../../about/meAbout/meAbout"
    });
  },
  onSetClick: function onSetClick() {
    wx.navigateTo({
      url: "../../set/index/index"
    });
  },
  //授权
  getUserInfoClick: function getUserInfoClick(e) {
    var _this = this;
    // console.log(e);
    var d = e.detail.userInfo;
    this.setData({
      userName: d.nickName,
      userImg: d.avatarUrl,
      isHide: false
    });
    var db = wx.cloud.database();
    var _ = db.command;
    db.collection("user").where({
      _openid: this.data.openid
    }).get({
      success: function success(res) {
        // console.log("查询用户:", res);
        if (res.data && res.data.length > 0) {
          // console.log("已存在");
          wx.showToast({
            title: "登录成功"
          });
          wx.setStorageSync("userId", res.data[0].userId),
            wx.setStorageSync("openId", res.data[0]._openid),
            wx.setStorageSync("userName", res.data[0].userName),
            wx.setStorageSync("userImg", res.data[0].userImg),
            this.setData({
              userId: res.data[0].userId,
              userName: res.data[0].userName,
              userImg: res.data[0].userImg,
              openId: res.data[0]._openid,
            })
            // console.log(res.data[0].userId);
        } else {
          setTimeout(function () {
            var userImg = d.avatarUrl,
              userName = d.nickName,
              userId;
            if (!userId) {
              userId = _this.getUserId();
            }
            // db.collection("user").add({
            //   data: {
            //     userId: userId,
            //     userImg: userImg,
            //     userName: userName,
            //     iv: d.iv
            //   },
            wx.cloud.callFunction({
              name: 'addUser',
              data: {
                userId: userId,
                userImg: userImg,
                userName: userName,
              },
              success: function success(res) {
                wx.showToast({
                  title: "注册成功"
                });
                // console.log('云addUser: ', res, res.result.openid)
                // console.log("用户新增成功");
                db.collection("user").where({
                  userId: userId
                }).get({
                  success: function success(res) {
                    wx.setStorageSync("userId", res.data[0].userId);
                    wx.setStorageSync("openId", res.data[0]._openid);
                    wx.setStorageSync("userName", res.data[0].userName);
                    wx.setStorageSync("userImg", res.data[0].userImg);
                    this.setData({
                      userName: res.data[0].userName,
                      userImg: res.data[0].userImg
                    })
                  }
                })
              }
            })
            //创建我的收藏
            {
              wx.cloud.callFunction({
                name: "addMeFavoriteBox",
                complete: function complete(res) {
                  // console.log('我的收藏创建成功')
                }
              })
            }
          }, 100);
        }
      }
    });
    this.onLoad();
  },
  // 获取用户openid
  getOpenid: function getOpenid() {
    var _this2 = this;
    wx.cloud.callFunction({
      name: "getOpenId",
      complete: function complete(res) {
        // console.log("云OpenId:", res.result.openId);
        _this2.setData({
          openid: res.result.openId
        });
      }
    });
  },
  getUserId: function getUserId() {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    //   firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "user";
    var userId = firstW + Date.now() + (Math.random() * 1e5).toFixed(0);
    // console.log(userId);
    wx.setStorageSync("userId", userId);
    return userId;
  },
  toMyComment: function toMyComment(e) {
    wx.navigateTo({
      url: "../myComment/myComment?userId=" + e.currentTarget.dataset.userId
    });
  },
  toMyTopic: function toMyTopic(e) {
    wx.navigateTo({
      url: "../myTopic/myTopic?userId=" + e.currentTarget.dataset.userId
    });
  },
  toMyFavorite: function toMyFavorite(e) {
    wx.navigateTo({
      url: "../myFavorite/myFavorite?userId=" + e.currentTarget.dataset.userId
    });
  },
  //修改头像
  upImg: function upImg(e) {
    wx.navigateTo({
      url: "../../set/upImg/upImg"
    })
  }
})