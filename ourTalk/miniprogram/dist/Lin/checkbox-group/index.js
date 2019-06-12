var _rules = require("../behaviors/rules");

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Component({
    behaviors: [ "wx://form-field", _rules2.default ],
    externalClasses: [ "l-class", "l-error-text" ],
    relations: {
        "../checkbox/index": {
            type: "child"
        }
    },
    properties: {
        current: {
            type: Array,
            value: [],
            observer: "onChangeHandle"
        },
        placement: {
            type: String,
            value: "column"
        }
    },
    data: {
        value: [],
        list: [],
        length: null
    },
    attached: function attached() {
        this.initRules();
    },
    ready: function ready() {
        var len = this.items().length;
        this.data.length = len;
        this.setData({
            length: len
        });
        this.onChangeHandle();
    },
    methods: {
        items: function items() {
            var items = this.getRelationNodes("../checkbox/index");
            return items;
        },
        // checkbox change
        onChangeHandle: function onChangeHandle() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data.current;
            var items = this.getRelationNodes("../checkbox/index");
            var len = items.length;
            if (len === this.data.length) {
                items.forEach(function(item) {
                    var type = val.indexOf(item.data.value) !== -1;
                    item.onChangeHandle(type, "init");
                });
            }
        },
        currentChange: function currentChange(val) {
            // const index = this.data.current.indexOf(val.value)
            this.data.list.push(val);
            this.setData({
                value: this.data.list
            });
        },
        onEmitEventHandle: function onEmitEventHandle(current) {
            var _this = this;
            var index = this.data.current.indexOf(current.value);
            index === -1 ? this.data.current.push(current.value) : this.data.current.splice(index, 1);
            index === -1 ? this.data.list.push(current) : this.data.list.splice(index, 1);
            this.setData({
                current: this.data.current
            }, function() {
                _this.validatorData({
                    value: _this.data.value
                });
            });
            var all = JSON.parse(JSON.stringify(this.data.list));
            for (var i = 0; i < all.length; i++) {
                delete all[i].all;
            }
            current.all = all;
            this.setData({
                value: all
            });
            this.triggerEvent("linchange", current);
        }
    }
});