// category.js
const app = getApp();

Page({
  data: {
    categories: [],       // 所有分类
    selectedId: 0,        // 选中的分类ID
    selectedName: "",     // 选中的分类名称
    filteredTasks: [],    // 筛选后的任务
    loading: true         // 加载状态
  },

  onLoad(options) {
    // 获取传入的分类ID（从首页跳转）
    const categoryId = options.categoryId ? parseInt(options.categoryId) : 1;
    this.initData(categoryId);
  },

  // 初始化数据
  initData(selectedId) {
    const categories = app.globalData.categories;
    const taskList = app.globalData.taskList;
    
    // 找到选中的分类名称
    const selectedItem = categories.find(item => item.id === selectedId) || categories[0];
    
    // 筛选对应分类的任务
    const filteredTasks = taskList.filter(item => item.categoryId === selectedId);

    this.setData({
      categories,
      selectedId,
      selectedName: selectedItem.name,
      filteredTasks,
      loading: false
    });
  },

  // 选择分类
  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.initData(id);
  },

  // 跳转到详情页
  goToDetail(e) {
    const taskId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${taskId}`
    });
  }
});