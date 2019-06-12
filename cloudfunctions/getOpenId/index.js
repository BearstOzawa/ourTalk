// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
  exports.main = async (event, context) => {
    console.log(event)
    console.log(context)
    return event.userInfo; //返回用户信息
    //返回用户信息
}