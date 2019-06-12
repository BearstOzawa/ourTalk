// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var userId = event.userId
  var userImg = event.userImg
  try {
    return await db.collection('user')
      .where({
        userId: userId
      })
      .update({
        data: {
          userImg: userImg
        },
      })
  } catch (e) {
    console.error(e)
  }
}