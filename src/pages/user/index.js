import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import message_img from '../../images/user/message.png';
import avatar_img from '../../images/user/avatar.png';
import coupon_img from '../../images/user/coupon.png';
import gift_img from '../../images/user/gift.png';
import deposit_img from '../../images/user/deposit.png';

@connect(({user}) => ({
  ...user,
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  componentDidMount = () => {

  };

  render() {
    const { list, mobile, coupon_number } = this.props;
    return (
      <View className="user-page">
        <View className="not-login">
          <View className="to-login" onClick={this.goPage}>
            <View className="left">
              <View className={mobile ? 'name black' : 'name '}>{ mobile || '请登录 >'}</View>
              <View className="msg">
                <Image src={message_img} />
              </View>
            </View>
            <View className="avatar-container">
              <Image className="avatar" src={avatar_img} />
            </View>
          </View>
          {/* <View className="list">
            {
              list && list.map((item, index) => (
                <View className="item" key={index}>
                  <Image mode="widthFix" src={item.img} />
                  <Text>{item.txt}</Text>
                  {item.num > 0 && <Icon className="num">{item.num}</Icon>}
                </View>
              ))
            }
          </View> */}
        </View>
        <View className="login">
          <View className="card">
            <View className="type type0">
              <View className="operation">
                <View className="txt">您还不是会员</View>
                <View className="btn">
                  成为会员
                  <Icon className="iconfont icon-more"></Icon>
                  <Icon className="iconfont icon-more"></Icon>
                </View>
              </View>
            </View>
          </View>
          <View className="item">
            <View className="left">
              <Image alt="" className="icon-left" src={coupon_img} />
              <Text>优惠券</Text>
            </View>
            <View className="right">
              {coupon_number && <Icon className="num">{coupon_number}</Icon>}
              <Icon className="iconfont icon-more arrow"></Icon>
            </View>
          </View>
          <View className="item" onClick={this.goWebview}>
            <View className="left">
              <Image alt="" className="icon-left" src={gift_img} />
              <Text>邀请有奖</Text>
            </View>
            <View className="right">
              <Text className="num">各得60元现金</Text>
              <Icon className="iconfont icon-more arrow"></Icon>
            </View>
          </View>
          <View className="item">
            <View className="left">
              <Image className="icon-left" src={deposit_img} />
              <Text>我的钱包</Text>
            </View>
            <View className="right">
              <Icon className="iconfont icon-more arrow"></Icon>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
