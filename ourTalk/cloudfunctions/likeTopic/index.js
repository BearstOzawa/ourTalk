// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  //取得传过来的参数, 可以使用{like,id } = event 更简洁
  var like = event.like, id = event.id;
  console.log('云likeTopich进入', like, id)

  // console.warn(data)

  try {
    return await db.collection('like').where({
      id: Number(id)
    }).update({
      data: {
        like: like
      },
      success: res => {
        console.log('云likeTopic成功', like, id)

      },
      fail: e => {
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }

}