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
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */ function pattern(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
        if ((0, _util.isEmptyValue)(value, "string") && !rule.required) {
            return callback();
        }
        _index2.default.required(rule, value, source, errors, options);
        if (!(0, _util.isEmptyValue)(value, "string")) {
            _index2.default.pattern(rule, value, source, errors, options);
        }
    }
    callback(errors);
}

exports.default = pattern;