// index.js
const app = getApp();

Page({
  data: {
    categories: [],       // 分类列表
    taskList: [],         // 所有任务列表
    topTasks: [],         // 置顶任务
    normalTasks: [],      // 普通任务
    sortType: 'new',      // 排序类型：new-最新 hot-最热
    loading: true         // 加载状态
  },

  onLoad() {
    this.initData();
  },

  // 初始化数据
  initData() {
    this.setData({
      categories: app.globalData.categories,
      taskList: app.globalData.taskList,
      loading: false
    }, () => {
      // 分离置顶和普通任务
      this.splitTasks();
      // 初始排序（最新）
      this.changeSort({ currentTarget: { dataset: { type: 'new' } } });
    });
  },

  // 分离置顶和普通任务
  splitTasks() {
    const topTasks = this.data.taskList.filter(item => item.isTop);
    const normalTasks = this.data.taskList.filter(item => !item.isTop);
    this.setData({ topTasks, normalTasks });
  },

  // 切换排序方式
  changeSort(e) {
    const type = e.currentTarget.dataset.type;
    let sortedTasks = [...this.data.normalTasks];
    
    if (type === 'new') {
      // 按时间倒序（最新）
      sortedTasks.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (type === 'hot') {
      // 模拟最热（这里简化为置顶优先+评论数多的靠前）
      sortedTasks.sort((a, b) => {
        const aComments = a.comments ? a.comments.length : 0;
        const bComments = b.comments ? b.comments.length : 0;
        return bComments - aComments;
      });
    }

    this.setData({
      sortType: type,
      normalTasks: sortedTasks
    });
  },

  // 跳转到分类页（并筛选）
  goToCategory(e) {
    const categoryId = e.currentTarget.dataset.categoryid;
    wx.navigateTo({
      url: `/pages/category/category?categoryId=${categoryId}`
    });
  },

  // 跳转到详情页
  goToDetail(e) {
    const taskId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${taskId}`
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.initData();
    wx.stopPullDownRefresh();
  }
});