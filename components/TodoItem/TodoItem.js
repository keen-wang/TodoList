// components/TodoItem.js
Component({
  properties: {
    // 事件内容
    content: {
      type: String,
      value: ''
    },
    // 事件状态
    finished: {
      type: Boolean,
      value: false
    },
    // 事件标签
    tags: {
      type: Array,
      value: []
    },
    // 备注
    extra: {
      type: String,
      value: ''
    },
    action: {
      type: String,
      value: ''
    }
  },
  data: {
    collapsed: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeTodo: function () {
      this.triggerEvent('itemRemove');
    },
    toggleExtra: function (e) {
      this.setData({
        collapsed: !this.data.collapsed
      });
    },
    toggleFinish(e) {
      this.triggerEvent('toggleStatus');
    }
  }
})
