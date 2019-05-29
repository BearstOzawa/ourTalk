Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

exports.format = format;

exports.isEmptyValue = isEmptyValue;

exports.isEmptyObject = isEmptyObject;

exports.asyncMap = asyncMap;

exports.complementError = complementError;

exports.deepMerge = deepMerge;

var formatRegExp = /%[sdj%]/g;

var warning = exports.warning = function warning() {};

function format() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
        return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
        var str = String(f).replace(formatRegExp, function(x) {
            if (x === "%%") {
                return "%";
            }
            if (i >= len) {
                return x;
            }
            switch (x) {
              case "%s":
                return String(args[i++]);

              case "%d":
                return Number(args[i++]);

              case "%j":
                try {
                    return JSON.stringify(args[i++]);
                } catch (_) {
                    return "[Circular]";
                }
                break;

              default:
                return x;
            }
        });
        for (var arg = args[i]; i < len; arg = args[++i]) {
            str += " " + arg;
        }
        return str;
    }
    return f;
}

function isNativeStringType(type) {
    return type === "string" || type === "url" || type === "hex" || type === "email" || type === "pattern";
}

function isEmptyValue(value, type) {
    if (value === undefined || value === null) {
        return true;
    }
    if (type === "array" && Array.isArray(value) && !value.length) {
        return true;
    }
    if (isNativeStringType(type) && typeof value === "string" && !value) {
        return true;
    }
    return false;
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

function asyncParallelArray(arr, func, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === arrLength) {
            callback(results);
        }
    }
    arr.forEach(function(a) {
        func(a, count);
    });
}

function asyncSerialArray(arr, func, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
        if (errors && errors.length) {
            callback(errors);
            return;
        }
        var original = index;
        index = index + 1;
        if (original < arrLength) {
            func(arr[original], next);
        } else {
            callback([]);
        }
    }
    next([]);
}

function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
        ret.push.apply(ret, objArr[k]);
    });
    return ret;
}

function asyncMap(objArr, option, func, callback) {
    if (option.first) {
        var flattenArr = flattenObjArr(objArr);
        return asyncSerialArray(flattenArr, func, callback);
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
        firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var next = function next(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
            callback(results);
        }
    };
    objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
            asyncSerialArray(arr, func, next);
        } else {
            asyncParallelArray(arr, func, next);
        }
    });
}

function complementError(rule) {
    return function(oe) {
        if (oe && oe.message) {
            oe.field = oe.field || rule.fullField;
            return oe;
        }
        return {
            message: oe,
            field: oe.field || rule.fullField
        };
    };
}

function deepMerge(target, source) {
    if (source) {
        for (var s in source) {
            if (source.hasOwnProperty(s)) {
                var value = source[s];
                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && _typeof(target[s]) === "object") {
                    target[s] = _extends({}, target[s], value);
                } else {
                    target[s] = value;
                }
            }
        }
    }
    return target;
}