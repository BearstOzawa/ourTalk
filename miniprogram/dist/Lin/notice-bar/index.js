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
    externalClasses: [ "l-class" ],
    properties: {
        type: {
            type: String,
            value: "still"
        },
        // 轮播数组
        swipArr: Array,
        // 前置图标
        frontIconName: {
            type: String,
            value: ""
        },
        frontIconSize: {
            type: Number,
            value: 28
        },
        frontIconColor: {
            type: String,
            value: "#3683D6"
        },
        endIconName: {
            type: String,
            value: ""
        },
        endIconSize: {
            type: Number,
            value: 28
        },
        endIconColor: {
            type: String,
            value: "#3683D6"
        },
        // 背景颜色
        backgroundcolor: {
            type: String,
            value: "#DFEDFF"
        },
        // 字体及图标颜色
        color: {
            type: String,
            value: "#3683D6"
        },
        // 滚动速度
        speed: {
            type: Number,
            value: 1500
        },
        show: {
            type: Boolean,
            value: true
        },
        close: {
            type: Boolean,
            value: false
        }
    },
    data: {
        wrapWidth: 0,
        width: 0,
        duration: 0,
        animation: null,
        timer: null
    },
    detached: function detached() {
        this.destroyTimer();
    },
    ready: function ready() {
        if (this.properties.type == "roll" && this.properties.show) {
            this.initAnimation();
        }
    },
    methods: {
        initAnimation: function initAnimation() {
            var _this = this;
            wx.createSelectorQuery().in(this).select(".l-noticebar-content-wrap").boundingClientRect(function(wrapRect) {
                wx.createSelectorQuery().in(_this).select(".l-noticebar-content").boundingClientRect(function(rect) {
                    var duration = rect.width / 40 * _this.data.speed;
                    var animation = wx.createAnimation({
                        duration: duration,
                        timingFunction: "linear"
                    });
                    _this.setData({
                        wrapWidth: wrapRect.width,
                        width: rect.width,
                        duration: duration,
                        animation: animation
                    }, function() {
                        _this.startAnimation();
                    });
                }).exec();
            }).exec();
        },
        startAnimation: function startAnimation() {
            var _this2 = this;
            //reset
                        if (this.data.animation.option.transition.duration !== 0) {
                this.data.animation.option.transition.duration = 0;
                var resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step();
                this.setData({
                    animationData: resetAnimation.export()
                });
            }
            this.data.animation.option.transition.duration = this.data.duration;
            var animationData = this.data.animation.translateX(-this.data.width).step();
            setTimeout(function() {
                _this2.setData({
                    animationData: animationData.export()
                });
            }, 100);
            var timer = setTimeout(function() {
                _this2.startAnimation();
            }, this.data.duration);
            this.setData({
                timer: timer
            });
        },
        destroyTimer: function destroyTimer() {
            if (this.data.timer) {
                clearTimeout(this.data.timer);
            }
        },
        handleTap: function handleTap() {
            this.triggerEvent("lintap");
            this.triggerEvent("lincatchtap", {}, {
                bubbles: true
            });
            this.setData({
                timer: null
            });
        },
        onSwip: function onSwip(e) {
            this.triggerEvent("lintap", _extends({}, e.currentTarget.dataset));
        },
        onIconTap: function onIconTap() {
            this.triggerEvent("linicontap");
            this.triggerEvent("liniconcatchtap", {}, {
                bubbles: true
            });
            this.setData({
                timer: null
            });
        },
        onClose: function onClose() {
            this.setData({
                timer: null,
                show: false
            });
        }
    }
});