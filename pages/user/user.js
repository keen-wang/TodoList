// pages/user/user.js
Page({
  data: {
    avatar: '',
    name: ''
  },
  onLoad: function () {
    this.setData({
      avatar: wx.getStorageSync('avatar') || 'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png',
      name: wx.getStorageSync('name') || ''
    });
  },
  changeAvatar: function (e) {
    console.log('修改图片')
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync('avatar', savedFilePath);
            that.setData({ avatar: savedFilePath });
          }
        });
      }
    })
  },
  //未点完成失去焦点复原（change优先于blur触发）
  blurName: function (e) {
    this.setData({ name: wx.getStorageSync('name')||'' });
  },

  changeName: function (e) {
    var name = e.detail.value;
    if (name&&name.trim()) {
      wx.setStorageSync('name', name);
    }
  }

})