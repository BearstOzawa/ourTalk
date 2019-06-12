const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(this.data.height)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  textInput: function textInput(e) {
    this.setData({
      text: e.detail.detail.value
    });
  },
  serach: function() {
    //连接数据库

    const db = wx.cloud.database()
    var _ = db.command;
    var that = this
    db.collection('topic').where({
      //使用正则查询，实现对搜索的模糊查询
      topicName: db.RegExp({
        regexp: this.data.text,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        // console.log(res)
        that.setData({
          search: res.data
        })
      }
    })
  },
  //oneTopic
  toOneTopic: function toOneTopic(e) {
    // console.log(e)
    wx.navigateTo({
      url: "../topic/oneTopic/oneTopic?topicId=" + e.currentTarget.dataset.id
    });
  },
})