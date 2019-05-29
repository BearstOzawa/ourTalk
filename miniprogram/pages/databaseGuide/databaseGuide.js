// pages/databaseGuide/databaseGuide.js
var app = getApp();

Page({
    data: {
        step: 1,
        counterId: "",
        openid: "",
        count: null,
        queryResult: ""
    },
    onLoad: function onLoad(options) {
        if (app.globalData.openid) {
            this.setData({
                openid: app.globalData.openid
            });
        }
    },
    onAdd: function onAdd() {
        // const db = wx.cloud.database()
        // db.collection('counters').add({
        //   data: {
        //     count: 1
        //   },
        //   success: res => {
        //     // 在返回结果中会包含新创建的记录的 _id
        //     this.setData({
        //       counterId: res._id,
        //       count: 1
        //     })
        //     wx.showToast({
        //       title: '新增记录成功',
        //     })
        //     console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        //   },
        //   fail: err => {
        //     wx.showToast({
        //       icon: 'none',
        //       title: '新增记录失败'
        //     })
        //     console.error('[数据库] [新增记录] 失败：', err)
        //   }
        // })
    },
    onQuery: function onQuery() {
        // const db = wx.cloud.database()
        // // 查询当前用户所有的 counters
        // db.collection('counters').where({
        //   _openid: this.data.openid
        // }).get({
        //   success: res => {
        //     this.setData({
        //       queryResult: JSON.stringify(res.data, null, 2)
        //     })
        //     console.log('[数据库] [查询记录] 成功: ', res)
        //   },
        //   fail: err => {
        //     wx.showToast({
        //       icon: 'none',
        //       title: '查询记录失败'
        //     })
        //     console.error('[数据库] [查询记录] 失败：', err)
        //   }
        // })
    },
    onCounterInc: function onCounterInc() {
        // const db = wx.cloud.database()
        // const newCount = this.data.count + 1
        // db.collection('counters').doc(this.data.counterId).update({
        //   data: {
        //     count: newCount
        //   },
        //   success: res => {
        //     this.setData({
        //       count: newCount
        //     })
        //   },
        //   fail: err => {
        //     icon: 'none',
        //     console.error('[数据库] [更新记录] 失败：', err)
        //   }
        // })
    },
    onCounterDec: function onCounterDec() {
        // const db = wx.cloud.database()
        // const newCount = this.data.count - 1
        // db.collection('counters').doc(this.data.counterId).update({
        //   data: {
        //     count: newCount
        //   },
        //   success: res => {
        //     this.setData({
        //       count: newCount
        //     })
        //   },
        //   fail: err => {
        //     icon: 'none',
        //     console.error('[数据库] [更新记录] 失败：', err)
        //   }
        // })
    },
    onRemove: function onRemove() {
        // if (this.data.counterId) {
        //   const db = wx.cloud.database()
        //   db.collection('counters').doc(this.data.counterId).remove({
        //     success: res => {
        //       wx.showToast({
        //         title: '删除成功',
        //       })
        //       this.setData({
        //         counterId: '',
        //         count: null,
        //       })
        //     },
        //     fail: err => {
        //       wx.showToast({
        //         icon: 'none',
        //         title: '删除失败',
        //       })
        //       console.error('[数据库] [删除记录] 失败：', err)
        //     }
        //   })
        // } else {
        //   wx.showToast({
        //     title: '无记录可删，请见创建一个记录',
        //   })
        // }
    },
    nextStep: function nextStep() {
        var _this = this;
        // 在第一步，需检查是否有 openid，如无需获取
                if (this.data.step === 1 && !this.data.openid) {
            wx.cloud.callFunction({
                name: "login",
                data: {},
                success: function success(res) {
                    app.globalData.openid = res.result.openid;
                    _this.setData({
                        step: 2,
                        openid: res.result.openid
                    });
                },
                fail: function fail(err) {
                    wx.showToast({
                        icon: "none",
                        title: "获取 openid 失败，请检查是否有部署 login 云函数"
                    });
                    console.log("[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：", err);
                }
            });
        } else {
            var callback = this.data.step !== 6 ? function() {} : function() {
                console.group("数据库文档");
                console.log("https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html");
                console.groupEnd();
            };
            this.setData({
                step: this.data.step + 1
            }, callback);
        }
    },
    prevStep: function prevStep() {
        this.setData({
            step: this.data.step - 1
        });
    },
    goHome: function goHome() {
        var pages = getCurrentPages();
        if (pages.length === 2) {
            wx.navigateBack();
        } else if (pages.length === 1) {
            wx.redirectTo({
                url: "../index/index"
            });
        } else {
            wx.reLaunch({
                url: "../index/index"
            });
        }
    }
});