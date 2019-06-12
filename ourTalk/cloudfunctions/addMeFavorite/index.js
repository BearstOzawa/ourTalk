const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  var openId = event.openId;
  var topicId = event.topicId;
  var favoriteTime = event.favoriteTime;
  var topicName = event.topicName;
  try {
    return await db.collection('favorite')
      .where({
        _openid: openId
      })
      .update({
        data: {
          favorite: _.unshift({
            favoriteTime: favoriteTime,
            topicId: topicId,
            topicName: topicName,
          })
        }
      })
  } catch (e) {
    console.error(e)
  }
}