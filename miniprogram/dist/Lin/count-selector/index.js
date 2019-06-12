Component({
    externalClasses: [ "l-class", "l-symbol-class", "l-count-class" ],
    properties: {
        count: {
            type: Number,
            value: 1
        },
        max: {
            type: Number,
            value: 10
        },
        min: {
            type: Number,
            value: 1
        },
        step: {
            type: Number,
            value: 1
        },
        disabled: Boolean
    },
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        doNothing: function doNothing() {},
        onBlur: function onBlur(e) {
            var _this = this;
            var value = e.detail.value;
            setTimeout(function() {
                _this.blurCount(value);
            }, 50);
        },
        blurCount: function blurCount(value) {
            if (value) {
                if (value > this.properties.max) this.setData({
                    count: this.properties.max
                }); else if (value < this.properties.min) this.setData({
                    count: this.properties.min
                }); else this.setData({
                    count: value
                });
            } else {
                this.setData({
                    count: this.properties.count
                });
            }
            var detail = {
                count: this.data.count,
                type: "blur"
            };
            this.triggerEvent("lintap", detail);
        },
        reduceTap: function reduceTap() {
            var distance = this.data.count - this.properties.step;
            if (distance <= this.properties.min) {
                this.data.count = this.properties.min;
            } else {
                this.data.count -= this.properties.step;
            }
            this.setData({
                count: this.data.count
            });
            var detail = {
                count: this.data.count,
                type: "reduce"
            };
            this.triggerEvent("lintap", detail);
        },
        addTap: function addTap() {
            var distance = this.data.count + this.properties.step;
            if (distance >= this.properties.max) {
                this.data.count = this.properties.max;
            } else {
                this.data.count += this.properties.step;
            }
            this.setData({
                count: this.data.count
            });
            var detail = {
                count: this.data.count,
                type: "add"
            };
            this.triggerEvent("lintap", detail);
        }
    }
});