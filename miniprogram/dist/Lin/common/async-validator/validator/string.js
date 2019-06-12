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

/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */ function string(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
        if ((0, _util.isEmptyValue)(value, "string") && !rule.required) {
            return callback();
        }
        _index2.default.required(rule, value, source, errors, options, "string");
        if (!(0, _util.isEmptyValue)(value, "string")) {
            _index2.default.type(rule, value, source, errors, options);
            _index2.default.range(rule, value, source, errors, options);
            _index2.default.pattern(rule, value, source, errors, options);
            if (rule.whitespace === true) {
                _index2.default.whitespace(rule, value, source, errors, options);
            }
        }
    }
    callback(errors);
}

exports.default = string;