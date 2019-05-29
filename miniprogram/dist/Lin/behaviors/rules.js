var _index = require("../common/async-validator/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

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

/**
 * @param tipType String [toast , message , text]
 */ module.exports = Behavior({
    behaviors: [],
    properties: {
        // 校验
        rules: {
            type: Object
        },
        tipType: {
            type: String,
            value: ""
        }
    },
    data: {
        schema: "",
        tipFun: {
            message: "showMessage",
            toast: "showToast"
        },
        tipContent: {
            message: "content",
            toast: "title"
        },
        errorText: ""
    },
    methods: {
        initRules: function initRules() {
            var rulesName = this.data.name;
            var rules = this.data.rules;
            if (!rules) return;
            var schema = new _index2.default(_defineProperty({}, rulesName, this.data.rules));
            this.setData({
                schema: schema
            });
        },
        validatorData: function validatorData(_ref2) {
            var _this = this;
            var value = _ref2.value;
            var _data = this.data, rules = _data.rules, tipType = _data.tipType, tipFun = _data.tipFun, tipContent = _data.tipContent;
            if (!rules) return;
            var validateValue = _defineProperty({}, this.data.name, value);
            this.data.schema.validate(validateValue, function(errors, fields) {
                console.log(errors);
                _this.triggerEvent("linvalidate", {
                    errors: errors,
                    isError: !!errors
                });
                if (errors && tipType) {
                    var _wx$lin$funName;
                    var funName = tipFun[tipType];
                    var contentName = tipContent[tipType];
                    if (tipType === "text") {
                        _this.setData({
                            errorText: errors[0].message
                        });
                        return;
                    }
                    if (!wx.lin || !wx.lin[funName]) {
                        wx.showToast({
                            icon: "none",
                            title: "请在页面内引入" + tipType + "组件"
                        });
                        return;
                    }
                    wx.lin[funName] && wx.lin[funName]((_wx$lin$funName = {}, _defineProperty(_wx$lin$funName, contentName, errors[0].message), 
                    _defineProperty(_wx$lin$funName, "duration", 1500), _defineProperty(_wx$lin$funName, "mask", false), 
                    _wx$lin$funName));
                } else if (!errors && tipType) {
                    _this.setData({
                        errorText: ""
                    });
                }
            });
        }
    }
});