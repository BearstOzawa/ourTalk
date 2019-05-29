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

Component({
    properties: {
        position: {
            type: String,
            value: "bottom"
        },
        show: {
            type: Boolean,
            value: true
        },
        selected: {
            type: Number,
            value: 0
        },
        color: {
            type: String,
            value: "#707070"
        },
        selectedColor: {
            type: String,
            value: "3963BC"
        },
        borderStyle: {
            type: String,
            value: "#f6f6f6"
        },
        backgroundColor: {
            type: String,
            value: "#fff"
        },
        backgroundImg: {
            type: String,
            value: ""
        },
        fontSize: {
            type: Number,
            value: 24
        },
        isRedirectToTab: {
            type: Boolean,
            value: true
        },
        // 是否跳转
        isNav: {
            type: Boolean,
            value: true
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {},
    attached: function attached() {},
    methods: {
        switchTab: function switchTab(e) {
            var data = e.currentTarget.dataset;
            var url = data.path;
            if (this.data.isNav) {
                if (this.data.isRedirectToTab) {
                    wx.redirectTo({
                        url: url
                    });
                } else {
                    wx.navigateTo({
                        url: url
                    });
                }
            }
            this.showItem(data.index);
        },
        show: function show() {
            this.setData({
                show: true
            });
        },
        hide: function hide() {
            this.setData({
                show: false
            });
        },
        showItem: function showItem(idx) {
            this.setData({
                selected: idx
            });
            var detail = idx;
            var option = {};
            this.triggerEvent("lintap", detail, option);
        },
        showRedDot: function showRedDot(idx) {
            var redDot = "list[" + idx + "].redDot";
            this.setData(_defineProperty({}, redDot, true));
        },
        hideRedDot: function hideRedDot(idx) {
            var redDot = "list[" + idx + "].redDot";
            this.setData(_defineProperty({}, redDot, false));
        },
        setTabBarBadge: function setTabBarBadge(idx, text) {
            var badge = "list[" + idx + "].badge";
            this.setData(_defineProperty({}, badge, text));
        },
        removeTabBarBadge: function removeTabBarBadge(idx) {
            var badge = "list[" + idx + "].badge";
            this.setData(_defineProperty({}, badge, ""));
        }
    }
});