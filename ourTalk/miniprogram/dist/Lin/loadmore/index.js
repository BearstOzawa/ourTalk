Component({
    externalClasses: [ "l-class" ],
    options: {
        multipleSlots: true
    },
    properties: {
        show: Boolean,
        custom: Boolean,
        line: Boolean,
        color: String,
        type: {
            type: String,
            value: "loading"
        },
        endText: {
            type: String,
            value: "我是有底线的~"
        },
        loadingText: {
            type: String,
            value: "加载中..."
        }
    },
    data: {},
    ready: function ready() {},
    methods: {
        onLoadmore: function onLoadmore() {
            this.triggerEvent("lintap");
            this.triggerEvent("lintapcatch", {}, {
                bubbles: true
            });
        }
    }
});