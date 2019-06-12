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
      console.log('云Comment获取', comment, topicId, commentNum)

  try {
    return await db.collection('topic').where({
      topicId: topicId
    }).update({
      data: {
        comment: comment,
        topicCommentNum: commentNum
      },
      success: res => {
        console.log('云Comment成功', comment, topicId, topicCommentNum)

      },
      fail: e => {
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }
}