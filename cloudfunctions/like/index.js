// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  vote: function(e) {
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
        name: 'like',
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
          console.error('[云函数] 调用失败：', err)
        }
      })
    }


  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}