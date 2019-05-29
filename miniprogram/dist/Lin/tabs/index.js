// components/tabs/index.js
Component({
    externalClasses: [ "l-class-tabs", "l-class-header", "l-class-active", "l-class-content", "l-class-inactive", "l-class-line", "l-class-tabimage", "l-class-header-line", "l-class-icon" ],
    relations: {
        "../tabpanel/index": {
            type: "child",
            linked: function linked(target) {
                // 每次有子节点被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
                this.initTabs();
            },
            unlinked: function unlinked(target) {
                this.initTabs();
            }
        }
    },
    options: {
        multipleSlots: true
    },
    /**
   * 组件的属性列表
   */
    properties: {
        activeKey: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        placement: {
            type: String,
            value: "top"
        },
        aminmated: Boolean,
        swipeable: Boolean,
        scrollable: Boolean,
        hasLine: {
            type: Boolean,
            value: true
        },
        aminmatedForLine: Boolean,
        activeColor: {
            type: String,
            value: "#333333"
        },
        inactiveColor: {
            type: String,
            value: "#bbbbbb"
        },
        equalWidth: {
            type: Boolean,
            value: true
        }
    },
    data: {
        tabList: [],
        currentIndex: 0,
        transformX: 0,
        transformY: 0
    },
    ready: function ready() {
        this.initTabs();
    },
    /**
   * 组件的方法列表
   */
    methods: {
        initTabs: function initTabs() {
            var _this = this;
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.activeKey;
            var items = this.getRelationNodes("../tabpanel/index");
            if (items.length > 0) {
                var activeKey = val, currentIndex = this.data.currentIndex;
                var tab = items.map(function(item, index) {
                    activeKey = !val && index == 0 ? item.data.key : activeKey;
                    currentIndex = item.data.key === activeKey ? index : currentIndex;
                    return {
                        tab: item.data.tab,
                        key: item.data.key,
                        icon: item.data.icon,
                        image: item.data.image,
                        picPlacement: item.data.picPlacement
                    };
                });
                this.setData({
                    tabList: tab,
                    activeKey: activeKey,
                    currentIndex: currentIndex
                }, function() {
                    if (_this.data.scrollable) {
                        _this.queryMultipleNodes();
                    }
                });
            }
        },
        swiperChange: function swiperChange(e) {
            var _e$detail = e.detail, source = _e$detail.source, current = _e$detail.current;
            if (source == "touch") {
                var currentIndex = current;
                var activeKey = this.data.tabList[current].key;
                this._setChangeData({
                    activeKey: activeKey,
                    currentIndex: currentIndex
                });
            }
        },
        handleChange: function handleChange(e) {
            var activeKey = e.currentTarget.dataset.key;
            var currentIndex = e.currentTarget.dataset.index;
            this._setChangeData({
                activeKey: activeKey,
                currentIndex: currentIndex
            });
        },
        _setChangeData: function _setChangeData(_ref) {
            var _this2 = this;
            var activeKey = _ref.activeKey, currentIndex = _ref.currentIndex;
            this.setData({
                activeKey: activeKey,
                currentIndex: currentIndex
            }, function() {
                if (_this2.data.scrollable) {
                    _this2.queryMultipleNodes();
                }
            });
            this.triggerEvent("linchange", {
                activeKey: activeKey,
                currentIndex: currentIndex
            });
        },
        queryMultipleNodes: function queryMultipleNodes() {
            var _this3 = this;
            var _data = this.data, placement = _data.placement, activeKey = _data.activeKey, tabList = _data.tabList;
            this._getRect("#key-" + activeKey).then(function(res) {
                console.log(res);
                if ([ "top", "bottom" ].indexOf(placement) !== -1) {
                    _this3.setData({
                        transformX: res.left > 0 ? res.left : "auto",
                        transformY: 0
                    });
                } else {
                    _this3._getRect(".l-tabs-header").then(function(navRect) {
                        var transformY = res.top - navRect.top - navRect.height / 2;
                        _this3.setData({
                            transformX: 0,
                            transformY: transformY
                        });
                    });
                }
            });
        },
        _getRect: function _getRect(selector) {
            var _this4 = this;
            return new Promise(function(resolve, reject) {
                var query = wx.createSelectorQuery().in(_this4);
                query.select(selector).boundingClientRect(function(res) {
                    if (!res) return reject("找不到元素");
                    resolve(res);
                }).exec();
            });
        }
    }
});