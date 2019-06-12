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
    /**
   * 组件的属性列表
   */
    relations: {
        "../steps/index": {
            type: "parent"
        }
    },
    properties: {
        icon: String,
        status: String,
        title: String,
        describe: String,
        iconSize: {
            type: Number,
            value: 24
        },
        iconColor: {
            type: String,
            value: "#fff"
        },
        custom: Boolean
    },
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        // 与父组件通信并绑定相关配置数据
        updateDataChange: function updateDataChange(options) {
            this.setData(_extends({}, options));
        }
    }
});