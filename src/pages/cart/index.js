import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({cart}) => ({
  ...cart,
}))
export default class Cart extends Component {
  config = {
    navigationBarTitleText: '衣袋',
  };

  goHome() {
    if (typeof window !== 'undefined') {
      Taro.navigateTo({
        url: '/pages/home/index',
      })
    }else {
      Taro.switchTab({
        url: '/pages/home/index',
      })
    }
  }

  render() {
    return (
      <View className="cart-page">
        <View className="empty">
          <Image src="http://static-r.msparis.com/uploads/b/c/bcffdaebb616ab8264f9cfc7ca3e6a4e.png" />
          <Button type="primary" className="am-button" onClick={this.goHome}>立即去挑选美衣</Button>
        </View>
      </View>
    )
  }
}
