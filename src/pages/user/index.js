import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import message_img from '../../images/user/message.png';
import avatar_img from '../../images/user/avatar.png';
import coupon_img from '../../images/user/coupon.png';
import gift_img from '../../images/user/gift.png';
import deposit_img from '../../images/user/deposit.png';

@connect(({user,common}) => ({
  ...user,
  ...common,
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  goPage = (e) => {
    if(e.currentTarget.dataset.url == '/pages/login/index' && this.props.access_token) {
      return;
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }

  render() {
    const { mobile, coupon_number, nickname } = this.props;
    return (
      <View className="user-page">
        <View className="not-login">
          <View className="to-login" data-url="/pages/login/index" onClick={this.goPage}>
            <View className="left">
              <View className={mobile ? 'name black' : 'name '}>{ nickname || '请登录 >'}</View>
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
                  <View className="iconfont icon-membership_more"></View>
                </View>
              </View>
            </View>
          </View>
          {/* <View className="item">
            <View className="left">
              <Image alt="" className="icon-left" src={coupon_img} />
              <Text>优惠券</Text>
            </View>
            <View className="right">
              {coupon_number && <View className="num">{coupon_number}</View>}
              <View className="iconfont icon-more arrow"></View>
            </View>
          </View> */}
          <View className="item" data-url="/pages/invite/index" onClick={this.goPage}>
            <View className="left">
              <Image alt="" className="icon-left" src={gift_img} />
              <Text>邀请有奖</Text>
            </View>
            <View className="right">
              <Text className="num">各得60元现金</Text>
              <View className="iconfont icon-more arrow"></View>
            </View>
          </View>
          <View className="item" data-url="/pages/about/index" onClick={this.goPage}>
            <View className="left">
              <Image className="icon-left" src={deposit_img} />
              <Text>关于</Text>
            </View>
            <View className="right">
              <View className="iconfont icon-more arrow"></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
