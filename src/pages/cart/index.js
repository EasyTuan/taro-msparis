import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({cart}) => ({
  ...cart,
}))
export default class Cart extends Component {
  config = {
    navigationBarTitleText: 'cart',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="cart-page">
        cart
      </View>
    )
  }
}
