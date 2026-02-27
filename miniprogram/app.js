// app.js
App({
  // 全局数据
  globalData: {
    userInfo: null,
    // 模拟分类数据
    categories: [
      { id: 1, name: "手机简单任务", icon: "images/category-icon1.png" },
      { id: 2, name: "电商薅羊毛", icon: "images/category-icon2.png" },
      { id: 3, name: "优惠券/返利", icon: "images/category-icon3.png" },
      { id: 4, name: "短视频/自媒体副业", icon: "images/category-icon4.png" },
      { id: 5, name: "本地福利", icon: "images/category-icon5.png" },
      { id: 6, name: "防骗专区", icon: "images/category-icon6.png" }
    ],
    // 模拟副业信息数据
    taskList: [
      {
        id: 1,
        title: "某APP注册领5元现金红包",
        income: "5元",
        difficulty: "简单",
        time: "2026-02-27",
        categoryId: 1,
        isTop: true,
        isFree: true,
        suitable: "所有人",
        steps: ["打开XXAPP", "点击首页注册按钮", "填写手机号验证", "领取红包"],
        keyInfo: "链接：https://xxx.com，有效期至2026-03-10，仅限新用户",
        notice: "无需充值，秒到账",
        comments: [
          { id: 1, content: "亲测有效，已到账！", time: "2026-02-26" },
          { id: 2, content: "步骤很简单，一分钟搞定", time: "2026-02-26" }
        ]
      },
      {
        id: 2,
        title: "淘宝618满减券免费领",
        income: "50元券",
        difficulty: "极易",
        time: "2026-02-26",
        categoryId: 2,
        isTop: false,
        isFree: true,
        suitable: "网购用户",
        steps: ["打开淘宝APP", "搜索618优惠券", "点击领取", "下单自动抵扣"],
        keyInfo: "链接：https://taobao.com，有效期至2026-06-20",
        notice: "每个账号限领1张",
        comments: [
          { id: 1, content: "券是真的，买东西省了不少", time: "2026-02-26" },
          { id: 2, content: "已失效，别领了", time: "2026-02-26" }
        ]
      },
      {
        id: 3,
        title: "警惕！刷单返现都是骗局",
        income: "0元",
        difficulty: "无",
        time: "2026-02-25",
        categoryId: 6,
        isTop: true,
        isFree: true,
        suitable: "所有人",
        steps: ["认清刷单骗局特征", "拒绝垫付资金", "遇到骗局及时报警"],
        keyInfo: "反诈中心电话：96110",
        notice: "任何要求垫付的都是骗局！",
        comments: [
          { id: 1, content: "身边有人被骗过，提醒很及时", time: "2026-02-25" }
        ]
      }
    ]
  },

  onLaunch() {
    // 初始化本地存储（收藏/浏览历史）
    if (!wx.getStorageSync('collectList')) {
      wx.setStorageSync('collectList', []);
    }
    if (!wx.getStorageSync('historyList')) {
      wx.setStorageSync('historyList', []);
    }
    // 获取用户信息（模拟）
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.globalData.userInfo = res.userInfo;
      }
    });
  },

  // 全局方法：添加浏览历史
  addHistory(task) {
    let historyList = wx.getStorageSync('historyList');
    // 去重：如果已存在则删除旧的，添加新的
    historyList = historyList.filter(item => item.id !== task.id);
    historyList.unshift(task);
    // 限制最多保存20条
    if (historyList.length > 20) {
      historyList.pop();
    }
    wx.setStorageSync('historyList', historyList);
  },

  // 全局方法：收藏/取消收藏
  toggleCollect(task) {
    let collectList = wx.getStorageSync('collectList');
    const index = collectList.findIndex(item => item.id === task.id);
    if (index > -1) {
      // 取消收藏
      collectList.splice(index, 1);
      wx.showToast({ title: '取消收藏成功', icon: 'success' });
    } else {
      // 收藏
      collectList.push(task);
      wx.showToast({ title: '收藏成功', icon: 'success' });
    }
    wx.setStorageSync('collectList', collectList);
    return collectList;
  },

  // 全局方法：检查是否已收藏
  isCollected(taskId) {
    const collectList = wx.getStorageSync('collectList');
    return collectList.some(item => item.id === taskId);
  }
});