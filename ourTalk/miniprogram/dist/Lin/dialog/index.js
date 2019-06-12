// dialog
Component({
    /**
   * 组件的属性列表
   */
    externalClasses: [ "l-class", "l-class-title", "l-class-content", "l-class-confirm", "l-class-cancel" ],
    properties: {
        // 显示与隐藏
        show: {
            type: Boolean,
            value: false
        },
        // 类型 【 alert: 提示框， confrim: 确认框 】
        type: {
            type: String,
            value: "alert"
        },
        // 标题文字
        title: {
            type: String,
            value: "提示"
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            value: true
        },
        // 内容
        content: {
            type: String,
            value: ""
        },
        // 锁定
        locked: {
            type: Boolean,
            value: true
        },
        // 确定按钮的文本
        confirmText: {
            type: String,
            value: "确定"
        },
        // 确定按钮的颜色
        confirmColor: {
            type: String,
            value: "#3683d6"
        },
        // 取消按钮的文本
        cancelText: {
            type: String,
            value: "取消"
        },
        cancelColor: {
            type: String,
            value: "#45526b"
        },
        openApi: {
            type: Boolean,
            value: true
        }
    },
    data: {
        success: null,
        fail: null
    },
    /**
   * 组件的初始数据
   */
    attached: function attached() {
        if (this.data.openApi) {
            this.initDialog();
        }
    },
    lifetimes: {
        show: function show() {
            if (this.data.openApi) {
                this.initDialog();
            }
        }
    },
    /**
   * 组件的方法列表
   */
    methods: {
        initDialog: function initDialog() {
            var _this = this;
            var config = {
                type: "alert",
                title: "提示",
                showTitle: true,
                content: "",
                locked: true,
                confirmText: "确定",
                cancelColor: "#3683d6",
                cancelText: "取消",
                confirmColor: "#45526b",
                success: null,
                fail: null
            };
            wx.lin = wx.lin || {};
            wx.lin.showDialog = function(options) {
                var _options$type = options.type, type = _options$type === undefined ? config.type : _options$type, _options$title = options.title, title = _options$title === undefined ? config.title : _options$title, _options$showTitle = options.showTitle, showTitle = _options$showTitle === undefined ? config.showTitle : _options$showTitle, _options$content = options.content, content = _options$content === undefined ? config.content : _options$content, _options$locked = options.locked, locked = _options$locked === undefined ? config.locked : _options$locked, _options$confirmText = options.confirmText, confirmText = _options$confirmText === undefined ? config.confirmText : _options$confirmText, _options$cancelColor = options.cancelColor, cancelColor = _options$cancelColor === undefined ? config.cancelColor : _options$cancelColor, _options$cancelText = options.cancelText, cancelText = _options$cancelText === undefined ? config.cancelText : _options$cancelText, _options$confirmColor = options.confirmColor, confirmColor = _options$confirmColor === undefined ? config.confirmColor : _options$confirmColor, _options$success = options.success, success = _options$success === undefined ? config.success : _options$success, _options$fail = options.fail, fail = _options$fail === undefined ? config.fail : _options$fail;
                _this.setData({
                    type: type,
                    title: title,
                    showTitle: showTitle,
                    content: content,
                    locked: locked,
                    confirmText: confirmText,
                    cancelColor: cancelColor,
                    cancelText: cancelText,
                    confirmColor: confirmColor,
                    show: true,
                    fail: fail,
                    success: success
                });
                return _this;
            };
        },
        // 确定按钮
        onConfirmTap: function onConfirmTap(e) {
            var detail = "confirm";
            var option = {};
            var success = this.data.success;
            success && success({
                confirm: true,
                cancel: false,
                errMsg: "showDialog: success"
            });
            this.setData({
                show: !this.data.show
            });
            this.triggerEvent("linconfirm", detail, option);
        },
        // 取消按钮
        onCancelTap: function onCancelTap(e) {
            var detail = "cancel";
            var option = {};
            var success = this.data.success;
            success && success({
                confirm: false,
                cancel: true,
                errMsg: "showDialog: success"
            });
            this.setData({
                show: !this.data.show
            });
            this.triggerEvent("lincancel", detail, option);
        },
        // 背景点击事件
        onDialogTap: function onDialogTap(e) {
            var detail = true;
            var option = {};
            if (this.data.locked !== true) {
                this.setData({
                    show: !this.data.show
                });
            }
            this.triggerEvent("lintap", detail, option);
        }
    }
});