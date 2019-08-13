//app.js
App({
  onLaunch(options) {
    // Do something initial when launch.
  },
  // 保存操作历史记录，记录事项、行为、时间
  writeHistory (todo, action) {
    var history = wx.getStorageSync('history') || [];
    var todo = todo ?{
      content: todo.content || '',
        tags: todo.tags || [],
          extra: todo.extra || ''
    } : null
    history.push({
      todo,
      action: action,
      timestamp: +new Date()
    });
    wx.setStorageSync('history', history);
  }
})