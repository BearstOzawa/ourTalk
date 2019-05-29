// mask
Component({
    /**
   * 组件的属性列表
   */
    externalClasses: [ "l-class", "l-item-class" ],
    behaviors: [ "wx://form-field" ],
    properties: {
        urls: {
            type: Array,
            value: []
        },
        // 最多可以选择的图片张数
        count: {
            type: [ String, Number ],
            value: 9
        },
        // 清除urls
        clear: {
            type: Boolean,
            value: false,
            observer: function observer(newVal, oldVal, changedPath) {
                if (newVal) {
                    this.handleClear();
                }
            }
        },
        // 每行可显示的个数
        size: {
            type: [ String, Number ],
            value: 3
        },
        // 所选的图片的尺寸 ['original', 'compressed']
        sizeType: {
            type: String,
            value: "original"
        },
        // 选择图片的来源
        // sourceType: {
        //   type: String,
        //   value: '',
        // },
        // 图片裁剪、缩放的模式
        mode: {
            type: String,
            value: "aspectFit"
        },
        // 设置是否传入slot
        custom: {
            type: Boolean,
            value: false
        },
        // 是否可以预览
        isPreview: {
            type: Boolean,
            value: true
        }
    },
    /**
   * 组件的初始数据
   */
    data: {
        showBtn: true,
        tempFilePath: ""
    },
    /**
   * 组件的方法列表
   */
    methods: {
        handleClear: function handleClear() {
            this.setData({
                urls: [],
                clear: false,
                showBtn: true
            });
            var detail = true;
            var option = {};
            this.triggerEvent("linclear", detail, option);
        },
        // 预览 preview
        onPreviewTap: function onPreviewTap(e) {
            var that = this;
            var index = e.currentTarget.dataset.index;
            var tempFilePath = this.data.urls[index];
            var detail = {
                index: index,
                // 下标
                current: tempFilePath,
                // 当前显示图片的http链接
                all: that.data.urls
            };
            var option = {};
            if (this.data.isPreview === true) {
                wx.previewImage({
                    current: tempFilePath,
                    // 当前显示图片的http链接
                    urls: that.data.urls
                });
            }
            this.triggerEvent("linpreview", detail, option);
        },
        // 增加 add
        onAddTap: function onAddTap(e) {
            var that = this;
            var count = this.data.count - this.data.urls.length;
            if (count === 0) {
                return;
            }
            wx.chooseImage({
                count: count,
                sizeType: this.data.sizeType,
                sourceType: [ "album", "camera" ],
                success: function success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePath = res.tempFilePaths;
                    var newtempFilePaths = that.data.urls.concat(tempFilePath);
                    // 判断是否还能继续添加图片 
                                        if (newtempFilePaths.length === parseInt(that.data.count)) {
                        that.setData({
                            showBtn: false
                        });
                    }
                    that.setData({
                        urls: newtempFilePaths,
                        value: newtempFilePaths,
                        tempFilePath: tempFilePath
                    });
                    var detail = {
                        current: tempFilePath,
                        all: newtempFilePaths
                    };
                    var option = {};
                    that.triggerEvent("linchange", detail, option);
                }
            });
        },
        // 删除 remove
        onDelTap: function onDelTap(e) {
            var index = e.currentTarget.dataset.index;
            var urls = this.data.urls;
            var tempFilePath = urls[index];
            var tempFilePaths = this.handleSplice(urls, tempFilePath);
            // 判断是否还能继续添加图片 
                        if (tempFilePaths.length < parseInt(this.data.count)) {
                this.setData({
                    showBtn: true
                });
            }
            this.setData({
                tempFilePath: tempFilePath,
                urls: tempFilePaths,
                value: tempFilePaths
            });
            var detail = {
                index: index,
                current: tempFilePath,
                all: tempFilePaths
            };
            var option = {};
            this.triggerEvent("linremove", detail, option);
        },
        handleSplice: function handleSplice(arr, current) {
            var newArr = arr.filter(function(item) {
                return item !== current;
            });
            return newArr;
        }
    },
    attached: function attached() {}
});