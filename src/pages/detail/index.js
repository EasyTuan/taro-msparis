import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({detail}) => ({
  ...detail,
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: 'detail',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="detail-page">
        detail
      </View>
    )
  }
}
