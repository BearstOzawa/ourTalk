// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.id
  var userId = event.userId
  try {
    return await db.collection('user')
    .where({
      _id: id
    })
    .update({
        data: {
          userId: userId
        },
      })
  } catch (e) {
    console.error(e)
  }
}
