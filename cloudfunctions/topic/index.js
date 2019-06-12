// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

  var userId = event.userId;
  console.log('云Topic获取', userId, userTopciNum)
  if (!userTopciNum) {
    db.collection('user').where({
      userId: userId
    }).get({
      success: res => {
        this.setData({
          userTopciNum: res.data[0].userTopciNum
        })
      }
    })
  }
  
  var userTopciNum = res.data[0].userTopciNum + 1;
  try {
    return await db.collection('user').where({
      userId: userId
    }).update({
      data: {
        userTopciNum: userTopciNum
      },
      success: res => {
        console.log('云Topic成功', userTopciNum)

      },
      fail: e => {
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }
}