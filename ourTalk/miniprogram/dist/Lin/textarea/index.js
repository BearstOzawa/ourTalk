var _rules = require("../behaviors/rules");

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Component({
    /**
   * 组件的属性列表
   */
    behaviors: [ "wx://form-field", _rules2.default ],
    externalClasses: [ "l-class", "l-error-text" ],
    properties: {
        // 占位文本
        placeholder: {
            type: String,
            value: ""
        },
        // 输入框的值
        value: {
            type: String,
            value: ""
        },
        // 获取焦点
        focus: {
            type: Boolean,
            value: false
        },
        // 最大输入长度
        maxlength: {
            type: Number,
            value: 140
        },
        // 表显示文字长度的计数器
        indicator: {
            type: Boolean,
            value: true
        },
        // label标题的显示位置 left top right
        autoHeight: {
            type: Boolean,
            value: false
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            value: false
        },
        // 是否显示边框
        border: {
            type: Boolean,
            value: true
        },
        // 校验
        rules: {
            type: Object
        },
        // 占位文字的样式  
        placeholderStyle: {
            type: String,
            value: ""
        }
    },
    /**
   * 组件的初始数据
   */
    data: {},
    attached: function attached() {
        this.initRules();
    },
    /**
   * 组件的方法列表
   */
    methods: {
        handleInputChange: function handleInputChange(event) {
            var _event$detail = event.detail, detail = _event$detail === undefined ? {} : _event$detail;
            var _detail$value = detail.value, value = _detail$value === undefined ? "" : _detail$value;
            this.setData({
                value: value
            });
            this.triggerEvent("linchange", event);
        },
        handleInputFocus: function handleInputFocus(event) {
            this.triggerEvent("linfocus", event);
        },
        handleInputBlur: function handleInputBlur(event) {
            this.validatorData({
                value: event.detail.value
            });
            this.triggerEvent("linblur", event);
        },
        handleInputConfirm: function handleInputConfirm(event) {
            var _event$detail2 = event.detail, detail = _event$detail2 === undefined ? {} : _event$detail2;
            var _detail$value2 = detail.value, value = _detail$value2 === undefined ? "" : _detail$value2;
            this.triggerEvent("linconfirm", event);
        }
    }
}); // input/input.js