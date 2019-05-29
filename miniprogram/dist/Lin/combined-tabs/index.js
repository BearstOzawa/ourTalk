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

// components/tabs/index.js
Component({
    externalClasses: [ "l-class-header", "l-class-active", "l-class-inactive", "l-class-line", "l-class-tabimage" ],
    relations: {
        "../tabpanel/index": {
            type: "child"
        },
        linked: function linked(target) {
            console.log(target);
            // 每次有子节点被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
                        this.initTabs();
        },
        unlinked: function unlinked(target) {
            this.initTabs();
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
        scrollable: Boolean,
        swipeable: {
            type: Boolean,
            value: true
        },
        hasLine: {
            type: Boolean,
            value: true
        },
        activeColor: {
            type: String,
            value: "#333333"
        },
        inactiveColor: {
            type: String,
            value: "#bbbbbb"
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
            this.initTabList();
            this.initActiveIndex();
        },
        initActiveIndex: function initActiveIndex() {
            var _this = this;
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.activeKey;
            var activeKey = val, currentIndex = this.data.currentIndex;
            this.data.tabList.forEach(function(item, index) {
                activeKey = !val && index == 0 ? item.key : activeKey;
                currentIndex = item.key === activeKey ? index : currentIndex;
            });
            this.setData({
                activeKey: activeKey,
                currentIndex: currentIndex
            }, function() {
                if (_this.data.scrollable) {
                    _this.queryMultipleNodes();
                }
            });
        },
        initTabList: function initTabList() {
            var _this2 = this;
            var items = this.getRelationNodes("../tabpanel/index");
            if (items.length > 0) {
                var tabList = [];
                items.forEach(function(item, index) {
                    var tabIndex = tabList.findIndex(function(tabItem) {
                        return tabItem.tab === item.data.tab;
                    });
                    var tab = {};
                    if (tabIndex === -1) {
                        tab = {
                            tab: item.data.tab,
                            key: item.data.key,
                            icon: item.data.icon,
                            iconStyle: item.data.iconStyle,
                            image: item.data.image,
                            subTabs: []
                        };
                        tabList.push(tab);
                    }
                    var targetTab = tabIndex === -1 ? tab : tabList[tabIndex];
                    if (item.data.subTab) {
                        targetTab.subTabs = targetTab.subTabs || [];
                        var subTabItem = {
                            tab: item.data.subTab,
                            key: item.data.subKey
                        };
                        targetTab.subTabs.push(subTabItem);
                        targetTab.activeSubKey = _this2.data.subActiveKey || targetTab.subTabs[0].key;
                        targetTab.subCurrentIndex = 0;
                    }
                });
                this.setData({
                    tabList: tabList
                });
            }
        },
        swiperChange: function swiperChange(e) {
            var _e$detail = e.detail, source = _e$detail.source, current = _e$detail.current;
            if (source == "touch") {
                var currentIndex = current;
                var activeKey = this.data.tabList[current].key;
                var subCurrentIndex = this.data.tabList[currentIndex].subCurrentIndex;
                var activeSubKey = this.data.tabList[currentIndex].activeSubKey;
                this._setChangeData({
                    activeKey: activeKey,
                    currentIndex: currentIndex,
                    subCurrentIndex: subCurrentIndex,
                    activeSubKey: activeSubKey
                });
            }
        },
        subSwiperChange: function subSwiperChange(e) {
            var _e$detail2 = e.detail, source = _e$detail2.source, current = _e$detail2.current;
            if (source == "touch") {
                var _data = this.data, currentIndex = _data.currentIndex, activeKey = _data.activeKey;
                var subCurrentIndex = current;
                var activeSubKey = this.data.tabList[currentIndex].subTabs[subCurrentIndex].key;
                var tabs = this.data.tabList[currentIndex];
                tabs.activeSubKey = activeSubKey;
                tabs.subCurrentIndex = subCurrentIndex;
                this.setData(_defineProperty({}, "tabList[" + currentIndex + "]", tabs));
                this._setChangeData({
                    activeKey: activeKey,
                    currentIndex: currentIndex,
                    activeSubKey: activeSubKey,
                    subCurrentIndex: subCurrentIndex
                });
            }
        },
        handleChange: function handleChange(e) {
            var isSubHeader = e.currentTarget.dataset.headerType === "subTab";
            var _data2 = this.data, currentIndex = _data2.currentIndex, activeKey = _data2.activeKey;
            var clickIndex = e.currentTarget.dataset.index;
            var subCurrentIndex = isSubHeader ? clickIndex : this.data.tabList[clickIndex].subCurrentIndex;
            var activeSubKey = isSubHeader ? this.data.tabList[currentIndex].subTabs[subCurrentIndex].key : this.data.tabList[clickIndex].activeSubKey;
            if (isSubHeader) {
                var tabs = this.data.tabList[currentIndex];
                tabs.activeSubKey = activeSubKey;
                tabs.subCurrentIndex = subCurrentIndex;
                this.setData(_defineProperty({}, "tabList[" + currentIndex + "]", tabs));
                this._setChangeData({
                    activeKey: activeKey,
                    currentIndex: currentIndex,
                    activeSubKey: activeSubKey,
                    subCurrentIndex: subCurrentIndex
                });
            } else {
                var _activeKey = e.currentTarget.dataset.key;
                this._setChangeData({
                    activeKey: _activeKey,
                    currentIndex: clickIndex,
                    subCurrentIndex: subCurrentIndex,
                    activeSubKey: activeSubKey
                });
            }
        },
        _setChangeData: function _setChangeData(_ref) {
            var _this3 = this;
            var activeKey = _ref.activeKey, currentIndex = _ref.currentIndex, _ref$activeSubKey = _ref.activeSubKey, activeSubKey = _ref$activeSubKey === undefined ? "" : _ref$activeSubKey, _ref$subCurrentIndex = _ref.subCurrentIndex, subCurrentIndex = _ref$subCurrentIndex === undefined ? null : _ref$subCurrentIndex;
            this.setData({
                activeKey: activeKey,
                currentIndex: currentIndex
            }, function() {
                if (_this3.data.scrollable) {
                    _this3.queryMultipleNodes();
                }
            });
            this.triggerEvent("linchange", {
                activeKey: activeKey,
                currentIndex: currentIndex,
                activeSubKey: activeSubKey,
                subCurrentIndex: subCurrentIndex
            });
        },
        queryMultipleNodes: function queryMultipleNodes() {
            var _this4 = this;
            var _data3 = this.data, placement = _data3.placement, activeKey = _data3.activeKey, tabList = _data3.tabList;
            this._getRect("#" + activeKey).then(function(res) {
                if ([ "top", "bottom" ].indexOf(placement) !== -1) {
                    _this4.setData({
                        transformX: res.left - tabList.length / 2 * res.width,
                        transformY: 0
                    });
                } else {
                    _this4._getRect(".l-tabs-header").then(function(navRect) {
                        var transformY = res.top - navRect.top - navRect.height / 2;
                        _this4.setData({
                            transformX: 0,
                            transformY: transformY
                        });
                    });
                }
            });
        },
        _getRect: function _getRect(selector) {
            var _this5 = this;
            return new Promise(function(resolve, reject) {
                var query = wx.createSelectorQuery().in(_this5);
                query.select(selector).boundingClientRect(function(res) {
                    if (!res) return reject("找不到元素");
                    resolve(res);
                }).exec();
            });
        }
    }
});