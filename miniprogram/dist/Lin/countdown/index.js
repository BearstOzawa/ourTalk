var _countdown = require("../behaviors/countdown");

var _countdown2 = _interopRequireDefault(_countdown);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Component({
    externalClasses: [ "l-class", "l-class-time" ],
    behaviors: [ _countdown2.default ],
    properties: {
        doneText: {
            type: String,
            value: "已结束"
        }
    },
    methods: {}
});