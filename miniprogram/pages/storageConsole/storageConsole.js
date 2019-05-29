// pages/storageConsole/storageConsole.js
var app = getApp();

Page({
    data: {
        fileID: "",
        cloudPath: "",
        imagePath: ""
    },
    onLoad: function onLoad(options) {
        var _app$globalData = app.globalData, fileID = _app$globalData.fileID, cloudPath = _app$globalData.cloudPath, imagePath = _app$globalData.imagePath;
        this.setData({
            fileID: fileID,
            cloudPath: cloudPath,
            imagePath: imagePath
        });
        console.group("文件存储文档");
        console.log("https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html");
        console.groupEnd();
    }
});