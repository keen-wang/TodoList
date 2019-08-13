// pages/detail/detail.js
Page({
  data: {
    todo: '',
    // 标签
    tag: '',
    tags: [],
    // 备注
    extra:''
  },
  // 获取输入框的值，保存到data中
  inputValue: function (e) {
    const key = e.target.dataset.key
    this.setData({ [key]: e.detail.value});
  },
  addTag () {
    // console.log('添加tag', this.data.tag)
    if (!this.data.tag || !this.data.tag.trim()) return
    var tags = this.data.tags
    tags.push(this.data.tag)
    this.setData({tag: '', tags})
  },
  removeTag (e) {
    var index = e.target.dataset.index
    var tags = this.data.tags
    tags.splice(index, 1)
    this.setData({ tags })
  },
  createTodo() {
    if (!this.data.todo) {
      wx.showToast({ title: '请填写待办内容~', icon: 'none' });
      return;
    }
    var todolist = wx.getStorageSync('todolist')||[]
    var todo = {
      content: this.data.todo,
      tags: this.data.tags,
      extra: this.data.extra
    };
    todolist.push(todo)
    wx.setStorageSync('todolist', todolist)
    wx.navigateBack()
  }
})