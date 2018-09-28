import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({home}) => ({
  ...home,
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
  };

  render() {
    return (
      <View className="home-page">
        首页
        {this.props.title}
      </View>
    )
  }
}

