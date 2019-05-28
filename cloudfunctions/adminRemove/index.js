// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  var filedvalue1 = event.data1
  var filedvalue2 = event.data2
  try {
    return await db.collection('mydata').add({
      data: {
        filed1: filedvalue1,
        filed2: filedvalue2
      }
    })
  } catch (e) {
    console.log(e)
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}