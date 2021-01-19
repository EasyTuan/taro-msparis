export default {
  pages: [
    //'pages/productDetail/index',
    'pages/login/index',
    'pages/home/index',
    'pages/cart/index',
    'pages/my/index',
    'pages/productDetail/index',
    //'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '时装衣橱',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/tab/home.png',
        selectedIconPath: './images/tab/home-active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: './images/tab/cart.png',
        selectedIconPath: './images/tab/cart-active.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './images/tab/user.png',
        selectedIconPath: './images/tab/user-active.png',
      },
    ],
    color: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
}
