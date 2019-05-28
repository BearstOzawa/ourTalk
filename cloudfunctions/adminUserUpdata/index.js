// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid
  var vdata1 = event.data1
  var vdata2 = event.data2
  try {
    return await db.collection("user").doc(user.id).update({
      data: {
        ID: user._id,
        name: user.userName,
      }, success: res => {
        wx.showToast({
          title: '修改成功',
        })
      }, fail: err => {
        wx.showToast({
          title: '修改失败',
        })
      }
    })
  } catch (e) {
    console.log(e)
  }
}