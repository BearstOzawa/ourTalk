// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('topic').add({
    data: {
      topicName: this.data.text,
      userId: wx.getStorageSync('userId'),
      topicUser: wx.getStorageSync('userName'),
      topicCommentNum: 0,
      topicTime:[],
      comment: [],
    }
  })
}