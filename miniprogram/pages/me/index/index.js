// pages/me/index/index.js
const APP_ID = 'wxd6b3bc1b09b39453';//输入小程序appid
const APP_SECRET = 'b7e8de6f54d66718705ed6349ee56cd6';//输入小程序app_secret
var OPEN_ID = ''//储存获取到openid
var SESSION_KEY = ''//储存获取到session_key
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userImg: '',
    userInfoGridStatus:'false',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        userImg: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // let userName = wx.getStorageSync('userName'),
    let userId = wx.getStorageSync('userId')
    //   userImg = wx.getStorageSync('userImg');
    // console.log(userName, userImg, userId)
    // if (userName) {
    //   this.setData({
    //     userName: userName,
    //     userImg: userImg,
    //     userId: userId,
    //   })
    // }
    const db = wx.cloud.database()
    const _ = db.command
    let d = userId
    var res
    db.collection('user').where({
      userId: d
    }).get({
      success: res => {
        this.setData({
          user: res.data,
          userTopicNum: res.data[0].userTopicNum,
          userCommentNum: res.data[0].userCommentNum,
          userName: res.data[0].userName,
          userImg: res.data[0].userImg,
          userId: res.data[0].userId,
        })
        console.log("user", res)
      }, fail: err => {
        wx.showToast({
          icon: "none",
          title: '获取失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onHelpClick: function () {
    wx.navigateTo({
      url: '../../About/meAbout/meAbout',
    })
  },
  onSetClick: function () {
    wx.navigateTo({
      url: '../../set/index/index',
    })
  },
  getUserInfoClick: function (e) {
    console.log(e)

    var d = e.detail.userInfo
    this.setData({
      userImg: d.avatarUrl,
      userName: d.nickName,
    })
    wx.setStorageSync('userName', d.nickName)
    wx.setStorageSync('userImg', d.avatarUrl)

    const db = wx.cloud.database()
    const _ = db.command
    var userId
    var userName
    var userImg
    var userTopicNum
    var userCommentNum

    db.collection('user').where({
      _openid: d.openid
    }).get({
      success: res => {
        console.log('查询用户:', res)
        if (res.data && res.data.length > 0) {
          console.log('用户已存在')
          wx.setStorageSync('openId', res.data[0]._openid)
          wx.setStorageSync('userId', res.data[0].userId)
          wx.showToast({
            title: '登录成功',
          })
          this.setData({
            user: res.data,
            userTopicNum: res.data[0].userTopicNum,
            userCommentNum: res.data[0].userCommentNum,
            userName: res.data[0].userName,
            userImg: res.data[0].userImg,
            userId: res.data[0].userId,
          })
          
        } else {
          setTimeout(() => {
            if (!userId) {
              userId = this.getUserId()
            }
            db.collection('user').add({
              data: {
                userId: userId,
                userImg: userImg,
                userName: userName,
                userTopicNum: 0,
                userCommentNum: 0,
                iv: d.iv
              },
              success: function () {
                wx.showToast({
                  title: '注册成功',
                })
                console.log(data)
                console.log('用户新增成功')

                db.collection('user').where({
                  userId: d.userId
                }).get({
                  success: res => {
                    wx.setStorageSync('openId', res.data[0]._openid)
                  },
                  fail: err => {
                    console.log('用户_openid设置失败')
                  }
                })
              },
              fail: function (e) {
                console.log('用户新增失败')
              }
            })
          }, 100)
        }
      },
      fail: err => {

      }
    })
  },
  getUserId: function () {
    // var w = "abcdefghijklmnopqrstuvwxyz0123456789",
    //   firstW = w[parseInt(Math.random() * (w.length))];
    var firstW = "user";

    var userId = firstW + (Date.now()) + (Math.random() * 100000).toFixed(0)
    console.log(userId)
    wx.setStorageSync("userId", userId)

    return userId;
  },
  getOpenId: function () {
    var that = this;
    var openId;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid  
            SESSION_KEY = res.data.session_key;//获取到session_key  
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
          }
        })
      }
    })
  },
  toMyComment: function (e) {
    wx.navigateTo({
      url: '../myComment/myComment?userId=' + e.currentTarget.dataset.userId,
    })
  },
  toMyTopic: function (e) {
    wx.navigateTo({
      url: '../myTopic/myTopic?userId=' + e.currentTarget.dataset.userId,
    })
  },
})
