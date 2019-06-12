Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require("../rule/index.js");

var _index2 = _interopRequireDefault(_index);

var _util = require("../util");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function date(rule, value, callback, source, options) {
    // console.log('integer rule called %j', rule);
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    // console.log('validate on %s value', value);
        if (validate) {
        if ((0, _util.isEmptyValue)(value) && !rule.required) {
            return callback();
        }
        _index2.default.required(rule, value, source, errors, options);
        if (!(0, _util.isEmptyValue)(value)) {
            var dateObject = void 0;
            if (typeof value === "number") {
                dateObject = new Date(value);
            } else {
                dateObject = value;
            }
            _index2.default.type(rule, dateObject, source, errors, options);
            if (dateObject) {
                _index2.default.range(rule, dateObject.getTime(), source, errors, options);
            }
        }
    }
    callback(errors);
}

exports.default = date;