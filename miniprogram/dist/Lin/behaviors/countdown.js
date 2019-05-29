module.exports = Behavior({
    behaviors: [],
    properties: {
        time: {
            type: Date,
            value: new Date().getTime() + 864e5
        },
        status: {
            type: Boolean,
            value: true,
            observer: function observer(newVal, oldVal, changedPath) {
                if (newVal) {
                    this.init();
                } else if (!newVal) {
                    clearInterval(this.data.timer);
                }
            }
        },
        timeType: {
            type: String,
            value: "datetime"
        },
        format: {
            type: String,
            value: "{%d}天{%h}时{%m}分{%s}秒"
        },
        isZeroPadd: {
            type: Boolean,
            value: true
        }
    },
    data: {
        initAddTime: 0,
        timer: null,
        date: []
    },
    ready: function ready() {
        this.getLatestTime();
    },
    detached: function detached() {
        clearInterval(this.data.timer);
    },
    pageLifetimes: {
        hide: function hide() {
            clearInterval(this.data.timer);
        }
    },
    methods: {
        // 自动补零
        zeroPadding: function zeroPadding(num) {
            num = num.toString();
            return num[1] ? num : "0" + num;
        },
        init: function init() {
            var _this = this;
            clearInterval(this.data.timer);
            var timer = setTimeout(function() {
                _this.getLatestTime.call(_this);
            }, 1e3);
            this.setData({
                timer: timer
            });
        },
        getLatestTime: function getLatestTime() {
            var _data = this.data, time = _data.time, status = _data.status, timeType = _data.timeType, initAddTime = _data.initAddTime;
            // IOS不支持2019-04-23 的日期格式
                        var countDownTime = time;
            if (timeType !== "second") {
                countDownTime = typeof time === "string" ? countDownTime.replace(/-/g, "/") : countDownTime;
                countDownTime = Math.ceil((new Date(countDownTime).getTime() - new Date().getTime()) / 1e3);
            }
            if (countDownTime < 0 && timeType !== "second") {
                this._getTimeValue(0);
                this.CountdownEnd();
                return;
            }
            if (countDownTime - initAddTime > 0) {
                this.getLatestForCountDown(countDownTime);
            } else if (countDownTime - initAddTime < 0) {
                this.getLatestForAddTime(countDownTime);
            } else if (countDownTime - initAddTime === 0) {
                if (initAddTime <= 0) {
                    this._getTimeValue(countDownTime);
                }
                this.CountdownEnd();
            }
            if (status && countDownTime - initAddTime !== 0) {
                this.init.call(this);
            }
        },
        getLatestForAddTime: function getLatestForAddTime(countDownTime) {
            var initAddTime = this.data.initAddTime;
            if (initAddTime !== Math.abs(countDownTime)) {
                initAddTime++;
                this._getTimeValue(initAddTime);
                this.setData({
                    initAddTime: initAddTime
                });
            }
        },
        getLatestForCountDown: function getLatestForCountDown(countDownTime) {
            this._getTimeValue(countDownTime);
            this.setData({
                time: this.data.timeType === "second" ? --countDownTime : this.data.time
            });
        },
        _getTimeValue: function _getTimeValue(countDownTime) {
            var _this2 = this;
            var format = this.data.format;
            var date = [];
            var fomatArray = format.split(/(\{.*?\})/);
            var formatType = [ {
                key: "{%d}",
                type: "day",
                count: 86400
            }, {
                key: "{%h}",
                type: "hour",
                count: 3600
            }, {
                key: "{%m}",
                type: "minute",
                count: 60
            }, {
                key: "{%s}",
                type: "second",
                count: 1
            } ];
            var diffSecond = countDownTime;
            formatType.forEach(function(format) {
                var index = _this2._findTimeName(fomatArray, format.key);
                if (index === -1) return;
                var name = fomatArray[index];
                var formatItem = {
                    type: format.type,
                    name: name,
                    value: parseInt(diffSecond / format.count)
                };
                if (_this2.data.isZeroPadd) {
                    formatItem.value = _this2.zeroPadding(formatItem.value);
                }
                diffSecond %= format.count;
                date.push(formatItem);
            });
            this.setData({
                date: date
            });
            return date;
        },
        _findTimeName: function _findTimeName(fomatArray, str) {
            var index = fomatArray.indexOf(str);
            if (index === -1) return -1;
            return index + 1;
        },
        CountdownEnd: function CountdownEnd() {
            this.triggerEvent("linend", {});
        }
    }
});