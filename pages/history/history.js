// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: [],
    groupedHistory: {},
    actionMap: {
      'create': '创建',
      'finish': '完成',
      'restart': '重启',
      'delete': '删除',
      'clear': '清空所有已办事项',
      'restartAll': '重启所有待办事项',
      'finishAll': '完成所有待办事项'
    },
    timeSetting: true
  },
  onShow () {
    var history = wx.getStorageSync('history')
    console.log('history', history)
    if (history) {
      this.setData({ history });
      this.processHistory();
    }
    // // 时间设置
    // var timeSetting = wx.getStorageSync('timeSetting');
    // if (typeof timeSetting == 'boolean') {
    //   this.setData({ timeSetting: timeSetting });
    // }
  },
  // 处理历史记录
  processHistory () {
    var history = this.data.history
    var dates = []
    var groupedHistory = history.map((item, index)=>{
      var d = new Date(item.timestamp)
      return {
        ...item,
        index,
        date: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
        time: d.getHours() + ':' + d.getMinutes(),
      } 
    }).reverse().reduce((result,item)=>{
      // 按每一天将操作事件分组
      if(!result[item.date]) {
        result[item.date] = [item]
        dates.push(item.date)
      } else {
        result[item.date].push(item)
      }
      return result
    },{})
    this.setData({ groupedHistory, dates})
    // console.log('groupedHistory', groupedHistory)
  },
  removeItem (e) {
    console.log('移除元素', e.target.dataset.index)
    var idx = e.target.dataset.index
    var history = this.data.history
    history.splice(idx,1)
    this.setData({history})
    wx.setStorageSync('history', this.data.history)
    // 删除操作记录后，重新分组
    this.processHistory()
  }
})