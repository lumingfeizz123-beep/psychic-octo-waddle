// mine.js
const app = getApp();

Page({
  data: {
    userInfo: null,        // 用户信息
    collectList: [],       // 收藏列表
    historyList: [],       // 浏览历史
    showCollect: false,    // 显示收藏弹窗
    showHistory: false,    // 显示历史弹窗
    showAbout: false       // 显示关于弹窗
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
      collectList: wx.getStorageSync('collectList'),
      historyList: wx.getStorageSync('historyList')
    });
  },

  // 显示我的收藏
  goToCollect() {
    this.setData({
      collectList: wx.getStorageSync('collectList'),
      showCollect: true
    });
  },

  // 隐藏收藏弹窗
  hideCollect() {
    this.setData({ showCollect: false });
  },

  // 显示浏览历史
  goToHistory() {
    this.setData({
      historyList: wx.getStorageSync('historyList'),
      showHistory: true
    });
  },

  // 隐藏历史弹窗
  hideHistory() {
    this.setData({ showHistory: false });
  },

  // 跳转到投稿页
  goToSubmit() {
    wx.navigateTo({ url: '/pages/submit/submit' });
  },

  // 跳转到反馈页
  goToFeedback() {
    wx.navigateTo({ url: '/pages/feedback/feedback' });
  },

  // 显示关于我们
  showAbout() {
    this.setData({ showAbout: true });
  },

  // 隐藏关于我们
  hideAbout() {
    this.setData({ showAbout: false });
  },

  // 跳转到详情页
  goToDetail(e) {
    const taskId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${taskId}`
    });
    // 关闭弹窗
    this.setData({ showCollect: false, showHistory: false });
  },

  // 页面显示时刷新数据
  onShow() {
    this.setData({
      collectList: wx.getStorageSync('collectList'),
      historyList: wx.getStorageSync('historyList')
    });
  }
});