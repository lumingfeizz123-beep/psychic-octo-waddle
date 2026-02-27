// feedback.js
Page({
  // 提交反馈
  submitFeedback(e) {
    const formData = e.detail.value;
    if (!formData.content.trim()) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' });
      return;
    }
    // 模拟提交
    wx.showToast({ title: '反馈提交成功，感谢你的建议', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});