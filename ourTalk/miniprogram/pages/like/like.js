Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
  vote: function (e) {
    var arr = this.data.voteArr;
    var id = Number(e.currentTarget.dataset.index),
      D = this.data.datas;
    console.log(id)
    if (arr.indexOf(D[id].id) != -1) {
      D[id].vote -= 1;
      arr.splice(arr.indexOf(D[id].id), 1)
      this.setData({
        datas: D,
        voteArr: arr
      })
    } else {
      arr.push(D[id].id)
      this.setData({
        voteArr: arr
      })
      if (id || id == 0) {
        D[id].zanUrl = this.data.zanIcon1
        D[id].vote = Number(D[id].vote) + 1
      }

      let data = {
        vote: Number(D[id].vote) + 1,
        id: D[id].id,
        userId: wx.getStorageSync('userId'),
      }
      console.log(data)

      wx.cloud.callFunction({
        name: 'likeTopic',
        //点赞需要的参数:
        //点赞数 +1
        //该条的id
        data: {
          vote: Number(D[id].vote) + 1,
          id: D[id].id,
        },
        success: res => {
          wx.showToast({
            title: '点赞成功',
          })
          this.setData({
            datas: D
          })

        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '点赞失败',
          })
          console.error('云like失败：', err)
        }
      })
    }


  },

})