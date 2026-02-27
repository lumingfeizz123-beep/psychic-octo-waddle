// detail.js
const app = getApp();

Page({
  data: {
    task: {},             // 当前任务详情
    isCollected: false,   // 是否已收藏
    commentContent: ""    // 评论内容
  },

  onLoad(options) {
    const taskId = parseInt(options.id);
    // 查找对应任务
    const task = app.globalData.taskList.find(item => item.id === taskId);
    if (task) {
      this.setData({
        task,
        isCollected: app.isCollected(taskId)
      });
      // 添加到浏览历史
      app.addHistory(task);
    } else {
      wx.showToast({ title: '信息不存在', icon: 'none' });
      wx.navigateBack();
    }
  },

  // 收藏/取消收藏
  toggleCollect() {
    const newCollectList = app.toggleCollect(this.data.task);
    this.setData({
      isCollected: newCollectList.some(item => item.id === this.data.task.id)
    });
  },

  // 分享任务
  shareTask() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 举报任务
  reportTask() {
    wx.showModal({
      title: '举报',
      content: '请选择举报原因',
      cancelText: '取消',
      confirmText: '提交',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '举报已提交，我们会尽快处理', icon: 'success' });
        }
      }
    });
  },

  // 输入评论
  inputComment(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  // 提交评论
  submitComment() {
    if (!this.data.commentContent.trim()) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    // 模拟添加评论（实际项目需对接后端）
    const newComment = {
      id: Date.now(), // 用时间戳作为临时ID
      content: this.data.commentContent,
      time: new Date().toLocaleDateString().replace(/\//g, '-')
    };
    const task = { ...this.data.task };
    task.comments = [...task.comments, newComment];
    // 更新全局数据
    app.globalData.taskList = app.globalData.taskList.map(item => {
      if (item.id === task.id) return task;
      return item;
    });
    // 更新页面数据
    this.setData({
      task,
      commentContent: ""
    });
    wx.showToast({ title: '评论发布成功', icon: 'success' });
  },

  // 分享到好友
  onShareAppMessage() {
    return {
      title: this.data.task.title,
      path: `/pages/detail/detail?id=${this.data.task.id}`,
      imageUrl: '/images/share-img.png'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.task.title,
      imageUrl: '/images/share-img.png'
    };
  }
});