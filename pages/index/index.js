// pages/index/index.js
// 注册页面
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    todolist: [],
    leftCount: 1,
    allSetting: true, // 是否允许全选
    clearSetting: true // 是否允许清楚
  },
  onShow () {
    var todolist = wx.getStorageSync('todolist');
    if (todolist) {
      var leftCount = todolist.reduce((result,item) => {
        return result + (!item.finished?1:0);
      },0);
      this.setData({ todolist, leftCount });
    }
    // 获取配置项
    // ['allSetting', 'clearSetting'].forEach(item=>{
    //   var setting = wx.getStorageSync(item);
    //   console.log(item, setting, wx.getStorageSync(item))
    //   if (typeof setting == 'boolean') {
    //     this.setData({ [item]: setting });
    //   }
    // })
  },
  inputTodo: function (e) {
    // 双线数据绑定
    this.setData({ inputValue: e.detail.value });
  },
  addTodo (e) {
    // console.log('addtodo', e);
    if (!this.data.inputValue || !this.data.inputValue.trim()) return;
    var todolist = this.data.todolist;
    var todo = { content: this.data.inputValue,tags: [], extra: '' };
    todolist.push(todo);
    this.save({
      inputValue: '',
      todolist,
      leftCount: this.data.leftCount + 1
    });
    getApp().writeHistory(todo, 'create');
    // getApp().writeHistory(todo, 'create', +new Date());
    // console.log('addtodo', e);
  },
  removeItem (e) {
    const index = e.currentTarget.dataset.index;
    var todolist = this.data.todolist;
    var removedItem = todolist.splice(index, 1)[0];
    this.save({
      todolist,
      leftCount: this.data.leftCount - (removedItem.finished ? 0 : 1)
    });
    getApp().writeHistory(removedItem, 'delete');

  },
  toggleStatus(e) {
    const index = e.currentTarget.dataset.index;
    var todolist = this.data.todolist;
    todolist[index].finished = !todolist[index].finished;
    this.save({
      todolist,
      leftCount: this.data.leftCount + (todolist[index].finished ? -1 : 1)
    });
    getApp().writeHistory(todolist[index], todolist[index].finished ? 'finish' : 'restart');
  },
  toggleAll(e) {
    if(this.data.leftCount !== 0) {
      var todolist = this.data.todolist.map(item=>({...item,finished: true}));
      var leftCount = 0;
    } else {
      var todolist = this.data.todolist.map(item => ({ ...item, finished: false }));
      var leftCount = this.data.todolist.length;
    }
    this.save({ todolist, leftCount})
    getApp().writeHistory(null, this.data.leftCount === 0 ? 'finishAll' : 'restartAll')
  },
  clearFinished(e) {
    var notFinishedList = this.data.todolist.filter(item=>!item.finished)
    this.save({
      todolist: notFinishedList
    })
    getApp().writeHistory(null, 'clear');
  },
  // 更新数据并保存到本地缓存
  save (data={}) {
    this.setData(data);
    wx.setStorageSync('todolist', this.data.todolist);
  },
  toCreateDetail (e) {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  }
})