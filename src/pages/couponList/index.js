import Taro, { Component } from '@tarojs/taro';
import { View, Input, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({couponList}) => ({
  ...couponList,
}))
export default class Couponlist extends Component {
  config = {
    navigationBarTitleText: '优惠券',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="couponList-page">
        <View className="couponList-page">
        <View className="header">
          <View className="coupons">
            暂无可用优惠券
          </View>
          <View className="getCoupon">
            <View>
              优惠码
              <Input type="text" placeholder="请输入优惠码" />
            </View>
            <Button inline size="small" className="so-small"> 兑换 </Button>
          </View>
        </View>
        <View className="no-coupon">
          <Image mode="widthFix" src="http://static-r.msparis.com/uploads/6/5/654c84bd4f3c3f1bd53fb6824e191775.png" alt="" />
        </View>
      </View>
      </View>
    )
  }
}
