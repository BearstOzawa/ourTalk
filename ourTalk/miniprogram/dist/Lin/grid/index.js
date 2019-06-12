Component({
    options: {
        multipleSlots: true
    },
    relations: {
        "../grid-item/index": {
            type: "child",
            linked: function linked(target) {
                this.initGrids();
            },
            unlinked: function unlinked(target) {
                this.initGrids();
            }
        }
    },
    externalClasses: [ "l-class", "l-class-grid" ],
    properties: {
        rowNum: {
            type: String,
            value: 3
        },
        showBorder: Boolean,
        showColBorder: Boolean,
        showRowBorder: Boolean
    },
    data: {
        gridItems: [],
        childNum: 0,
        currentIndex: null
    },
    ready: function ready() {
        this.initGrids();
    },
    lifetimes: {
        show: function show() {}
    },
    methods: {
        initGrids: function initGrids() {
            var items = this.getRelationNodes("../grid-item/index");
            if (this.data.childNum === items.length) return;
            var gridItems = items.map(function(item) {
                return {
                    key: item.data.key
                };
            });
            this.setData({
                gridItems: gridItems,
                childNum: items.length
            });
        },
        tapGridItem: function tapGridItem(e) {
            var index = e.currentTarget.dataset.index;
            this.setData({
                currentIndex: index
            });
            var items = this.getRelationNodes("../grid-item/index");
            items[index].tapGridItem({
                index: index
            });
        },
        tapGrid: function tapGrid(e) {
            this.triggerEvent("lintap", {
                index: this.data.currentIndex
            });
        }
    }
});