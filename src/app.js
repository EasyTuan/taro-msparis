import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Home from './pages/home'
import dva from './utils/dva'
import models from './models'
import { Provider } from '@tarojs/redux'

import './styles/base.scss'


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/detail/index',
      'pages/about/index',
      'pages/size/index',
      'pages/login/index',
      'pages/message/index',
      'pages/couponList/index',
      'pages/order/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '时装衣橱',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./images/tab/home.png",
        selectedIconPath: "./images/tab/home-active.png"
      }, {
        pagePath: "pages/cart/index",
        text: "衣袋",
        iconPath: "./images/tab/cart.png",
        selectedIconPath: "./images/tab/cart-active.png"
      },{
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "./images/tab/user.png",
        selectedIconPath: "./images/tab/user-active.png"
      }],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: '#ccc'
    }
  }

  componentDidMount() {

  }

  render() {
    return (<Provider store={store}>
      <Home/>
    </Provider>);
  }
}

Taro.render(<App/>, document.getElementById('app'))
