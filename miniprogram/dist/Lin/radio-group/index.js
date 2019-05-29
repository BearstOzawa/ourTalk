Component({
    externalClasses: [ "l-class", "l-error-text" ],
    behaviors: [ "wx://form-field" ],
    relations: {
        "../radio/index": {
            type: "child",
            linked: function linked() {
                this.onChangeHandle();
            },
            linkChanged: function linkChanged() {
                this.onChangeHandle();
            },
            unlinked: function unlinked() {
                this.onChangeHandle();
            }
        }
    },
    properties: {
        current: {
            type: String,
            value: "",
            observer: "onChangeHandle"
        },
        placement: {
            type: String,
            value: "column"
        }
    },
    methods: {
        // radio change
        onChangeHandle: function onChangeHandle() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.current;
            var items = this.getRelationNodes("../radio/index");
            var len = items.length;
            if (len) {
                items.forEach(function(item) {
                    var type = val === item.data.value;
                    item.onChangeHandle(type);
                });
            }
        },
        onEmitEventHandle: function onEmitEventHandle(current) {
            this.setData({
                value: current.value
            });
            this.triggerEvent("linchange", current);
        }
    }
});