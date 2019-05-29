var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

Component({
    externalClasses: [ "l-class-title", "l-class-item", "l-class-cancel" ],
    properties: {
        locked: Boolean,
        showCancel: Boolean,
        show: Boolean,
        itemList: Array,
        cancelText: {
            type: String,
            value: "取消"
        },
        title: String,
        openApi: {
            type: Boolean,
            value: true
        }
    },
    data: {
        success: "",
        fail: "",
        isIphoneX: false
    },
    attached: function attached() {
        if (this.data.openApi) {
            this.initActionSheet();
        }
        this.initUIAdapter();
    },
    lifetimes: {
        show: function show() {
            if (this.data.openApi) {
                this.initActionSheet();
            }
        }
    },
    methods: {
        /**
        * 区分UI尺寸
        */
        initUIAdapter: function initUIAdapter() {
            var _this = this;
            wx.getSystemInfo({
                success: function success(res) {
                    _this.setData({
                        isIphoneX: res.model == "iPhone X" ? true : false
                    });
                }
            });
        },
        initActionSheet: function initActionSheet() {
            var _this2 = this;
            var config = {
                itemList: [],
                success: null,
                fail: null,
                title: "",
                locked: true,
                cancelText: "取消",
                showCancel: false
            };
            wx.lin = wx.lin || {};
            wx.lin.showActionSheet = function() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var _options$itemList = options.itemList, itemList = _options$itemList === undefined ? config.itemList : _options$itemList, _options$success = options.success, success = _options$success === undefined ? config.success : _options$success, _options$fail = options.fail, fail = _options$fail === undefined ? config.fail : _options$fail, _options$title = options.title, title = _options$title === undefined ? config.title : _options$title, _options$locked = options.locked, locked = _options$locked === undefined ? config.locked : _options$locked, _options$cancelText = options.cancelText, cancelText = _options$cancelText === undefined ? config.cancelText : _options$cancelText, _options$showCancel = options.showCancel, showCancel = _options$showCancel === undefined ? config.showCancel : _options$showCancel;
                _this2.setData({
                    itemList: itemList.slice(0, 10),
                    success: success,
                    fail: fail,
                    title: title,
                    locked: locked,
                    cancelText: cancelText,
                    showCancel: showCancel,
                    show: true
                });
                return _this2;
            };
        },
        handleClickItem: function handleClickItem(e) {
            var success = this.data.success;
            success && success(_extends({}, e.currentTarget.dataset));
            this.triggerEvent("linitemtap", _extends({}, e.currentTarget.dataset));
            this._hideActionSheet();
        },
        _showActionSheet: function _showActionSheet() {
            this.setData({
                show: true
            });
        },
        _hideActionSheet: function _hideActionSheet() {
            this.setData({
                show: false
            });
        },
        handleClickCancel: function handleClickCancel() {
            var fail = this.data.fail;
            fail && fail({
                errMsg: "showactionsheet:fail cancel"
            });
            this.triggerEvent("lincancel", {
                errMsg: "showactionsheet:fail cancel"
            });
            this._hideActionSheet();
        },
        handleClickPopUp: function handleClickPopUp() {
            if (!this.data.locked) {
                this.handleClickCancel();
            }
        }
    }
});