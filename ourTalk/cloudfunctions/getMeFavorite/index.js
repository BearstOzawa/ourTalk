const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('favorite')
      .where({
        _openid: event.openId
      })
      .orderBy('favoriteTime', 'desc')
      .get({
        success: function (res) {
          return res.result.data;
        }
      });
  } catch (e) {
    console.error(e);
  }
}