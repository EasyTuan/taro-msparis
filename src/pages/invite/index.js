import Taro, { Component } from '@tarojs/taro';
import { View, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({invite}) => ({
  ...invite,
}))
export default class Invite extends Component {
  config = {
    navigationBarTitleText: '邀请有奖',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="invite-page">
        <Image mode="widthFix" src="http://static-r.msparis.com/uploads/8/f/8f4c47bc4f5e795e42ea1a2402332b19.png"/>
        <Image mode="widthFix" className="banner" src='http://static-r.msparis.com/uploads/2/4/2463bf54223481dacc8c022e2a793d3f.jpeg' />
        <Image mode="widthFix" src="http://static-r.msparis.com/uploads/1/0/100e953ce2b32b88076d99a2f5a4a579.png" />
        <Image mode="widthFix" src="http://static-r.msparis.com/uploads/c/c/cc81740306c5da099afbce5b1c7a8ff2.png" />
        <View className="bottom-btn">
          <Button open-type="share" type="button" className="m-button" onClick={this.share}>
            立即邀请好友
          </Button>
        </View>
      </View>
    )
  }
}
