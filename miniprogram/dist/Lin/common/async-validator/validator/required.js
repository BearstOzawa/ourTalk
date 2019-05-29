Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _index = require("../rule/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function required(rule, value, callback, source, options) {
    var errors = [];
    var type = Array.isArray(value) ? "array" : typeof value === "undefined" ? "undefined" : _typeof(value);
    _index2.default.required(rule, value, source, errors, options, type);
    callback(errors);
}

exports.default = required;