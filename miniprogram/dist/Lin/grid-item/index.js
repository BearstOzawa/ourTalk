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

Component({
    relations: {
        "../grid/index": {
            type: "parent"
        }
    },
    externalClasses: [ "l-grid-item" ],
    properties: {
        key: String
    },
    data: {},
    attached: function attached() {},
    lifetimes: {
        show: function show() {}
    },
    methods: {
        tapGridItem: function tapGridItem(e) {
            this.triggerEvent("lintap", _extends({}, e), {
                composed: true
            });
        }
    }
});