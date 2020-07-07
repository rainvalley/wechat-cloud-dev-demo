// 云函数入口文件
const cloud = require('wx-server-sdk')
// 当存在多个环境时,注意指定环境ID初始化
cloud.init({
    env:'raincorn-lo6kz'
  })

// 云函数入口函数
exports.main = async (event, context) => {
    return cloud.database().collection("users").get();
}