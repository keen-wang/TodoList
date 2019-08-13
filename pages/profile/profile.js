// pages/profile/profile.js
Page({
  data: {
    avatar: '',
    name: ''
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {
    ['name', 'avatar'].forEach(item => {
      var val = wx.getStorageSync(item) || ''
      this.setData({ [item]: val })
    })
  },
  navTo (e) {
    var path = e.currentTarget.dataset.target
    wx.navigateTo({
      url: `/pages/${path}/${path}`,
    })
  }
})