// pages/index/index.js
// 注册页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    todolist: [{ content: 'hahahha', finished: false, id: +new Date() }],
    leftCount: 1,
    allSetting: true, // 是否允许全选
    clearSetting: true // 是否允许清楚
  },
  inputTodo: function (e) {
    // console.log('onItemRemove', e, this.data.inputValue);
    // 双线数据绑定
    this.setData({ inputValue: e.detail.value });
  },
  addTodo (e) {
    // console.log('addtodo', e);
    if (!this.data.inputValue || !this.data.inputValue.trim()) return;
    var todos = this.data.todolist;
    var todo = { content: this.data.inputValue, finished: false, id: +new Date() };
    todos.push(todo);
    this.setData({
      inputValue: '',
      todolist: todos,
      leftCount: this.data.leftCount + 1
    });
    // this.save();
    // getApp().writeHistory(todo, 'create', +new Date());
    // console.log('addtodo', e);
  },
  removeItem (e) {
    const index = e.currentTarget.dataset.index;
    var todolist = this.data.todolist;
    var removedItem = todolist.splice(index, 1)[0];
    this.setData({
      todolist,
      leftCount: this.data.leftCount - (removedItem.finished ? 0 : 1)
    });

  },
  toggleStatus(e) {
    const index = e.currentTarget.dataset.index;
    var todolist = this.data.todolist;
    todolist[index].finished = !todolist[index].finished;
    this.setData({
      todolist,
      leftCount: this.data.leftCount + (todolist[index].finished ? -1 : 1)
    });
  },
  toggleAll(e) {
    if(this.data.leftCount !== 0) {
      var todolist = this.data.todolist.map(item=>({...item,finished: true}));
      var leftCount = 0;
    } else {
      var todolist = this.data.todolist.map(item => ({ ...item, finished: false }));
      var leftCount = this.data.todolist.length;
    }
    this.setData({ todolist, leftCount})
  },
  clearFinished(e) {
    var notFinishedList = this.data.todolist.filter(item=>!item.finished)
    this.setData({
      todolist: notFinishedList
    })
  }
})