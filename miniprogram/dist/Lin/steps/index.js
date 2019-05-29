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
    options: {
        multipleSlots: true
    },
    relations: {
        "../step/index": {
            type: "child",
            linked: function linked() {
                this._initSteps();
            },
            unlinked: function unlinked() {
                this._initSteps();
            }
        }
    },
    properties: {
        direction: {
            type: String,
            value: "row"
        },
        activeIndex: {
            type: Number,
            value: 1
        },
        activeColor: {
            type: String,
            value: "#3963bc"
        },
        color: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "number"
        }
    },
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        _initSteps: function _initSteps() {
            var _this = this;
            var steps = this.getRelationNodes("../step/index");
            var length = steps.length;
            if (this.data.direction == "row") this.setData({
                length: length
            });
            if (length > 0) {
                steps.forEach(function(step, index) {
                    step.updateDataChange(_extends({
                        length: length,
                        index: index
                    }, _this.data));
                });
            }
        }
    }
});