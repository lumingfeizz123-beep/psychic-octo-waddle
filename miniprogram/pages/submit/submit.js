// submit.js
const app = getApp();

Page({
  data: {
    categories: [],               // 分类列表
    difficultyList: ['极易', '简单', '中等', '较难', '困难'], // 难度列表
    selectedCategory: "",         // 选中的分类
    selectedDifficulty: ""        // 选中的难度
  },

  onLoad() {
    this.setData({
      categories: app.globalData.categories
    });
  },

  // 选择分类（绑定picker的change事件）
  bindCategoryChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedCategory: this.data.categories[index].name
    });
  },

  // 选择难度
  bindDifficultyChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedDifficulty: this.data.difficultyList[index]
    });
  },

  // 提交表单
  submitForm(e) {
    const formData = e.detail.value;
    // 表单验证
    if (!formData.title || !formData.categoryId || !formData.suitable || !formData.difficulty || !formData.income || !formData.steps || !formData.keyInfo || !formData.notice) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    // 处理步骤（转数组）
    const steps = formData.steps.split('\n').filter(item => item.trim());
    // 模拟提交（实际项目需对接后端审核）
    const newTask = {
      id: Date.now(), // 时间戳作为ID
      title: formData.title,
      categoryId: parseInt(formData.categoryId) + 1, // 对应分类ID
      suitable: formData.suitable,
      difficulty: formData.difficulty,
      income: formData.income,
      isFree: formData.isFree === 'true',
      steps,
      keyInfo: formData.keyInfo,
      notice: formData.notice,
      time: new Date().toLocaleDateString().replace(/\//g, '-'),
      isTop: false,
      comments: []
    };
    // 添加到全局数据
    app.globalData.taskList.unshift(newTask);
    // 提示并返回首页
    wx.showToast({ title: '投稿提交成功，审核通过后将展示', icon: 'success' });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/index/index' });
    }, 1500);
  }
});