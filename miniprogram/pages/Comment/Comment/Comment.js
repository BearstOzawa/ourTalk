// pages/Comment/Comment/Comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentUserName:'Ozawa',
    commentUserImg:'../../../images/topic/defImg.png',
    userComment: '大雄要死掉了, 他对妻子说: 我死之后你找一个男人我就在地下打一一个滚。说完就咽气了。某天妻子有事要找大雄，就去了地府问阎王找人',
    userCommentTime:'2019-05-21 21:00:00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({
        title: '您还未登录,请先登录~',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../../me/index/index',
        })
      }, 1500)
    } else {
      console.log(userId)
    }
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
  textInput: function (e) {
    console.log(e)
    this.setData({
      text: e.detail.detail.value
    })
  },
  addComment: function (e) {
    console.log(e)
    this.setData({
      commentName: e.detail.value
    })
  },
  confirm: function () {
    const db = wx.cloud.database()
    const _ = db.command

    let userId = wx.getStorageSync('userId')

    //发送评论
    let d = new Date(), data = {};
    let arr = util.typeC(this.data.data.comment) == 'array' ? this.data.data.comment : new Array(this.data.data.comment);
    if (this.data.commentName) {
      data = {
        commentName: this.data.commentName,
        userName: wx.getStorageSync('username'),
        commentTime: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        userId: wx.getStorageSync('userId'),
        id: this.data.itemId,
        userImg: wx.getStorageSync('userImg')
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
          url: '../me/me',
        })
      }, 1000)
    } else {
      var cn = this.data.data.comment.length + 1;
      db.collection('comment').add({
        data: {
          id: data.userId,
          userId: data.userId,
          commentName: data.comment,
          _openid: userOpenId
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
          id: this.data.itemId,
          commentNum: cn
        },
        success: res => {
          wx.showToast({
            title: '评论成功',
          })
          this.search()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '评论失败',
          })
          console.error('云函数Comment调用失败：', err)
        }
      })
    }
    console.log(data)
  },

})