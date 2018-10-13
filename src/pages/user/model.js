export default {
  namespace: 'user',
  state: {
    list: [
      {
        txt: '待支付',
        img: 'http://static-r.msparis.com/uploads/d/e/de473a00fca2dae58c16decbd538347a.png',
        num: 0,
        link: '/userOrder.html?type=1',
        type: 2,
      },
      {
        txt: '待发货',
        img: 'http://static-r.msparis.com/uploads/1/a/1acfd9f403b338721bec4a0acd2af7c8.png',
        num: 0,
        link: '/userOrder.html?type=5',
        type: 3,
      },
      {
        txt: '已发货',
        img: 'http://static-r.msparis.com/uploads/7/b/7bd041417677878833efc599ffa43376.png',
        num: 0,
        link: '/userOrder.html?type=3',
        type: 9, // 已发货的类型海伦正在加，后续会补上
      },
      {
        txt: '待归还',
        img: 'http://static-r.msparis.com/uploads/e/9/e94bc2b990c1f87611529dba0a194c6e.png',
        num: 0,
        link: '/userOrder.html?type=6',
        type: 8,
      },
      {
        txt: '全部订单',
        img: 'http://static-r.msparis.com/uploads/b/b/bb575a6b318b47bae81b9acbba2f5fb8.png',
        num: 0,
        link: '/userOrder.html?type=0',
        type: 0,
      },
    ],
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
