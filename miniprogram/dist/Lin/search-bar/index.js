var _properties;

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

// cpn/search-bar/index.js
Component({
    /**
   * 组件的属性列表
   */
    externalClasses: [ "l-class", "l-input-container", "l-placeholder-class", "l-input-class", "l-cancel-class" ],
    properties: (_properties = {
        confirmType: {
            type: String,
            value: "search"
        },
        placeholder: String
    }, _defineProperty(_properties, "confirmType", {
        type: String,
        value: "search"
    }), _defineProperty(_properties, "cancelText", {
        type: String,
        value: "取消"
    }), _defineProperty(_properties, "address", String), _defineProperty(_properties, "iconColor", {
        type: String,
        value: "#333"
    }), _defineProperty(_properties, "iconSize", {
        type: String,
        value: "28"
    }), _defineProperty(_properties, "bgColor", {
        type: String,
        value: "#f3f3f3"
    }), _defineProperty(_properties, "showCancel", {
        type: Boolean,
        value: true
    }), _defineProperty(_properties, "shape", {
        type: String,
        value: "primary"
    }), _defineProperty(_properties, "TextAlign", {
        type: String,
        value: "left"
    }), _defineProperty(_properties, "adress", String), _defineProperty(_properties, "focus", {
        type: Boolean,
        value: false
    }), _defineProperty(_properties, "clear", {
        type: Boolean,
        value: true
    }), _defineProperty(_properties, "maxlength", {
        type: Number,
        value: 140
    }), _defineProperty(_properties, "disabled", {
        type: Boolean,
        value: false
    }), _defineProperty(_properties, "placeholderStyle", {
        type: String,
        value: ""
    }), _properties),
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        // input属性列表
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
            this.triggerEvent("linblur", event);
        },
        handleInputConfirm: function handleInputConfirm(event) {
            var _event$detail2 = event.detail, detail = _event$detail2 === undefined ? {} : _event$detail2;
            var _detail$value2 = detail.value, value = _detail$value2 === undefined ? "" : _detail$value2;
            this.setData({
                value: value
            });
            this.triggerEvent("linconfirm", event);
        },
        onClearTap: function onClearTap(event) {
            this.setData({
                value: ""
            });
            this.triggerEvent("linclear", event);
        }
    }
});