var db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: wx.getStorageSync("userImg"),
    userName: wx.getStorageSync("userName"),
    userImg: wx.getStorageSync("userImg"),

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
  // uploadImgHandle: function () {
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: res => {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       this.setData({
  //         tempImg: tempFilePaths
  //       })
  //     }
  //   })
  // },
  // submit: function () {
  //   wx.showLoading({
  //     title: '提交中',
  //   })
  //   const promiseArr = []
  //   //只能一张张上传 遍历临时的图片数组
  //   for (let i = 0; i < this.data.tempImg.length; i++) {
  //     let filePath = this.data.tempImg[i]
  //     let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
  //     //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
  //     promiseArr.push(new Promise((reslove, reject) => {
  //       wx.cloud.uploadFile({
  //         cloudPath: new Date().getTime() + suffix,
  //         filePath: filePath, // 文件路径
  //       }).then(res => {
  //         // get resource ID
  //         console.log(res.fileID)

  //         this.setData({
  //           // fileIDs: res.fileID
  //           fileIDs: this.data.fileIDs
  //         })
  //         reslove()
  //       }).catch(error => {
  //         console.log(error)
  //       })
  //     }))
  //   }
  //   Promise.all(promiseArr).then(res => {
  //     var userId = wx.getStorageSync('userId')
  //     console.log(this.data.fileIDs)
  //     wx.cloud.callFunction({
  //       name: 'userUpImg',
  //       data: {
  //         userId: userId,
  //         userImg: this.data.fileIDs
  //       }
  //     })
  //       .then(res => {
  //         console.log(res)
  //         wx.hideLoading()
  //         wx.showToast({
  //           title: '修改成功',
  //         })
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   })
  // },
  upImg() {
    let that = this;
    let userId = wx.getStorageSync('userId');
    // let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = 'userImg/' + name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            // console.log('上传成功：', res)
            that.setData({
              userImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;
            //把图片存到users集合表
            //权限！
            //使用云函数
            wx.cloud.callFunction({
              name: 'userUpImgMe',//修改用户头像
              data: {
                userId: userId,
                userImg: fileID
              },
              success: function () {
                // console.log('userUpImgMe')
                wx.cloud.callFunction({
                  name: 'userUpImgTopic',//修改主页主题头像
                  data: {
                    userId: userId,
                    userImg: fileID
                  },
                  success: function () {
                    // console.log('userUpImgTopic')
                    wx.cloud.callFunction({
                      name: 'userUpImgTopicUser',//修改主题页用户头像
                      data: {
                        userId: userId,
                        userImg: fileID
                      },
                      success: function () {
                        // console.log('userUpImgTopicUser')
                        wx.cloud.callFunction({
                          name: 'userUpImgComment',//修改评论头像
                          data: {
                            userId: userId,
                            userImg: fileID
                          },
                          success: function () {
                            // console.log('userUpImgComment')
                            wx.showToast({
                              title: '修改成功',
                              'icon': 'none',
                              duration: 3000
                            })
                            wx.setStorageSync("userImg", fileID);
                          },
                          fail: function () {
                            wx.showToast({
                              title: '修改失败',
                              'icon': 'none',
                              duration: 3000
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          },
          fail: e => {
            // console.error('[上传失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
})