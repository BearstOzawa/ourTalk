Component({
    externalClasses: [ "l-class", "l-image-class" ],
    properties: {
        show: Boolean,
        icon: String,
        image: String,
        content: String,
        type: {
            type: String,
            value: "primary"
        },
        duration: {
            type: Number,
            value: 1500
        },
        openApi: {
            type: Boolean,
            value: true
        }
    },
    data: {
        status: false
    },
    attached: function attached() {
        this.initMessage();
    },
    lifetimes: {
        show: function show() {
            this.initMessage();
        }
    },
    observers: {
        show: function show(_show) {
            _show && this.changeStatus();
        }
    },
    methods: {
        initMessage: function initMessage() {
            var _this = this;
            wx.lin = wx.lin || {};
            wx.lin.showMessage = function() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var _options$content = options.content, content = _options$content === undefined ? "" : _options$content, _options$icon = options.icon, icon = _options$icon === undefined ? "" : _options$icon, _options$image = options.image, image = _options$image === undefined ? "" : _options$image, _options$type = options.type, type = _options$type === undefined ? "primary" : _options$type, _options$duration = options.duration, duration = _options$duration === undefined ? 1500 : _options$duration, _options$success = options.success, success = _options$success === undefined ? null : _options$success;
                _this.data.success = success;
                _this.setData({
                    content: content,
                    icon: icon,
                    image: image,
                    duration: duration,
                    type: type
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
        }
    }
});