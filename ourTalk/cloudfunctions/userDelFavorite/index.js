// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.openId
  var topicId = event.topicId
  try {
    return await db.collection('favorite')
      .where({
        _openid: openId,
        'favorite.topicId':topicId
      })
      .update()
  } catch (e) {
    console.error(e)
  }
}