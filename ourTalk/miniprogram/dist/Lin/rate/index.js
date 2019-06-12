Component({
    /**
     * 组件的属性列表
     */
    externalClasses: [ "l-class", "l-class-icon", "l-class-image" ],
    options: {
        multipleSlots: true
    },
    properties: {
        count: {
            type: Number,
            value: 5
        },
        score: {
            type: Number,
            value: 0
        },
        size: {
            type: String,
            value: "36"
        },
        disabled: Boolean,
        activeColor: {
            type: String,
            value: "#FF5252"
        },
        inActiveColor: {
            type: String,
            value: "#FFE5E5"
        },
        name: {
            type: String,
            value: "favor-fill"
        },
        activeImage: String,
        inActiveImage: String
    },
    /**
     * 组件的初始数据
     */
    data: {},
    /**
     * 组件的方法列表
     */
    methods: {
        handleClick: function handleClick(e) {
            if (this.data.disabled) return;
            var index = e.currentTarget.dataset.index;
            this.setData({
                score: index + 1
            });
            this.triggerEvent("linChange", {
                score: index + 1
            });
        }
    }
});