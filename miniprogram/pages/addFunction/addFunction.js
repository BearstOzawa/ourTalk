// pages/addFunction/addFunction.js
var code = "// 云函数入口函数\nexports.main = (event, context) => {\n  console.log(event)\n  console.log(context)\n  return {\n    sum: event.a + event.b\n  }\n}";

Page({
    data: {
        result: "",
        canIUseClipboard: wx.canIUse("setClipboardData")
    },
    onLoad: function onLoad(options) {},
    copyCode: function copyCode() {
        wx.setClipboardData({
            data: code,
            success: function success() {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    testFunction: function testFunction() {
        var _this = this;
        wx.cloud.callFunction({
            name: "sum",
            data: {
                a: 1,
                b: 2
            },
            success: function success(res) {
                wx.showToast({
                    title: "调用成功"
                });
                _this.setData({
                    result: JSON.stringify(res.result)
                });
            },
            fail: function fail(err) {
                wx.showToast({
                    icon: "none",
                    title: "调用失败"
                });
                console.error("[云函数] [sum] 调用失败：", err);
            }
        });
    }
});