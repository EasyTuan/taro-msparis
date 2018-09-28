import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({user}) => ({
  ...user,
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: 'user',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="user-page">
        user
      </View>
    )
  }
}
