// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mainmodel: {
      type: Object,
      value: {}
    },
    menulist: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showmenus:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showclick:function(){
      console.log("showclick")
      let isshow = !this.data.showmenus;
      console.log(isshow)
      this.setData({
        showmenus: isshow,
      })
    },
    itemclick:function(e){
      this.showclick();
      console.log(e.currentTarget.dataset);
      let info = e.currentTarget.dataset.item;
      if (info){
        this.triggerEvent('menuItemClick', {
            "iteminfo":info
        })
      }
    }
   

  }
})
