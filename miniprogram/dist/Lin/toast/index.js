function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

// toast
Component({
    /**
   * 组件的属性列表
   */
    externalClasses: [ "" ],
    properties: {
        // 显示与隐藏
        show: {
            type: Boolean,
            value: false
        },
        // 提示框的文本内容
        title: {
            type: String,
            value: "",
            observer: "elip"
        },
        // icon
        icon: {
            type: String,
            value: ""
        },
        // icon-style
        iconStyle: {
            type: String,
            value: "size:60; color:#fff",
            observer: "parseIconStyle"
        },
        // image
        image: {
            type: String,
            value: ""
        },
        // icon-style
        imageStyle: {
            type: String,
            value: "60*60",
            observer: "parseImageStyle"
        },
        // 文字的显示方位
        placement: {
            type: String,
            value: "bottom"
        },
        // 提示框显示的时长
        duration: {
            type: Number,
            value: 1500
        },
        // 提示框的层级
        zIndex: {
            type: Number,
            value: 999
        },
        // 设置提示框是否为垂直居中
        center: {
            type: Boolean,
            value: true
        },
        // 是否显示透明蒙层，防止触摸穿透
        mask: {
            type: Boolean,
            value: false
        },
        openApi: {
            type: Boolean,
            value: true
        }
    },
    observers: {
        show: function show(_show) {
            _show && this.changeStatus();
        }
    },
    /**
   * 组件的初始数据
   */
    data: {
        status: false,
        success: "",
        fail: "",
        complete: ""
    },
    attached: function attached() {
        if (this.data.openApi) {
            this.initToast();
        }
    },
    lifetimes: {
        show: function show() {
            if (this.data.openApi) {
                this.initToast();
            }
        }
    },
    /**
   * 组件的方法列表
   */
    methods: {
        initToast: function initToast() {
            var _this = this;
            wx.lin = wx.lin || {};
            wx.lin.showToast = function() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var _options$title = options.title, title = _options$title === undefined ? "" : _options$title, _options$icon = options.icon, icon = _options$icon === undefined ? "" : _options$icon, _options$iconStyle = options.iconStyle, iconStyle = _options$iconStyle === undefined ? "size:60; color:#fff" : _options$iconStyle, _options$image = options.image, image = _options$image === undefined ? "" : _options$image, _options$imageStyle = options.imageStyle, imageStyle = _options$imageStyle === undefined ? "60*60" : _options$imageStyle, _options$placement = options.placement, placement = _options$placement === undefined ? "bottom" : _options$placement, _options$duration = options.duration, duration = _options$duration === undefined ? 1500 : _options$duration, _options$center = options.center, center = _options$center === undefined ? true : _options$center, _options$mask = options.mask, mask = _options$mask === undefined ? false : _options$mask, _options$success = options.success, success = _options$success === undefined ? null : _options$success, _options$complete = options.complete, complete = _options$complete === undefined ? null : _options$complete;
                _this.setData({
                    title: title,
                    icon: icon,
                    iconStyle: iconStyle,
                    image: image,
                    imageStyle: imageStyle,
                    placement: placement,
                    duration: duration,
                    center: center,
                    mask: mask,
                    show: true,
                    success: success,
                    complete: complete
                });
                _this.changeStatus();
                return _this;
            };
        },
        changeStatus: function changeStatus() {
            var _this2 = this;
            this.setData({
                status: true
            });
            if (this.data.timer) clearTimeout(this.data.timer);
            this.data.timer = setTimeout(function() {
                _this2.setData({
                    status: false
                });
                if (_this2.data.success) _this2.data.success();
                _this2.data.timer = null;
            }, this.properties.duration);
        },
        // 返回icon的宽高
        parseIconStyle: function parseIconStyle(str) {
            var _this3 = this;
            var arr = str ? str.split(";") : [ "size: 60", "color: #fff" ];
            arr.map(function(item) {
                item = item.trim().split(":");
                _this3.setData(_defineProperty({}, item[0], item[1]));
                return item;
            });
        },
        // 返回图片的宽高
        parseImageStyle: function parseImageStyle(str) {
            var arr = str ? str.split("*") : [ 60, 60 ];
            if (arr.length === 1) {
                arr = [ arr[0], arr[0] ];
            }
            this.setData({
                imageW: arr[0],
                imageH: arr[1]
            });
            return arr;
        },
        elip: function elip(text) {
            var textLen = text ? this.strlen(text) : 0;
            if (textLen) {
                text = text.substring(0, 20);
            } else {
                text = "";
            }
            this.setData({
                title: text
            });
            return text;
        },
        strlen: function strlen(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                if (c >= "0x0001" && c <= "0x007e" || "0xff60" <= c && c <= "0xff9f") {
                    len++;
                } else {
                    len += 2;
                }
            }
            return len;
        },
        // 阻止滑动
        doNothingMove: function doNothingMove(e) {
            // do nothing……
        },
        // 点击事件
        onMaskTap: function onMaskTap(e) {
            var detail = true;
            var option = {};
            if (this.data.locked !== true) {
                this.setData({
                    fullScreen: "hide",
                    status: "hide"
                });
            }
            this.triggerEvent("linTap", detail, option);
        }
    }
});