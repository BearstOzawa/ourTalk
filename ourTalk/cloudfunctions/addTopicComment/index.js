// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  var comment = event.comment,
    topicId = event.topicId,
    commentNum = event.commentNum;
  try {
    return await db.collection('topic')
      .where({
        topicId: topicId
      }).update({
        data: {
          comment: event.comment,
          topicCommentNum: event.commentNum
        },
        success: res => {
        },
        fail: e => {
          console.error(e)
        }
      })
  } catch (e) {
    console.error(e)
  }
}