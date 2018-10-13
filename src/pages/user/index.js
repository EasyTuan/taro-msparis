import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import message_img from '../../images/user/message.png';
import avatar_img from '../../images/user/avatar.png';
import coupon_img from '../../images/user/coupon.png';
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

  goToPage = (e) => {
    if(!this.props.access_token) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
      return;
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }

  outLogin = (e) => {
    e.stopPropagation();
    if(!this.props.access_token) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
      return;
    }
    Taro.showModal({
      content: '是否退出当前账号？'
    })
    .then(res => {
      if (res.confirm) {
        Taro.removeStorageSync('user_info');
        Taro.removeStorageSync('access_token');
        this.props.dispatch({
          type: 'cart/init',
        });
        this.props.dispatch({
          type: 'common/save',
          payload: {
            access_token: '',
            invitation_code: '',
            mobile: '',
            nickname: '',
            new_user: '',
            is_has_buy_card: '',
            erroMessage: '',
          },
        });
        this.props.dispatch({
          type: 'login/save',
          payload: {
            access_token: '',
            invitation_code: '',
            mobile: '',
            nickname: '',
            new_user: '',
            is_has_buy_card: '',
            erroMessage: '',
          },
        });
      }
    })
  }

  render() {
    const { mobile, coupon_number, nickname, list } = this.props;
    return (
      <View className="user-page">
        <View className="not-login">
          <View className="to-login" data-url="/pages/login/index" onClick={this.goPage}>
            <View className="left">
              <View className={mobile ? 'name black' : 'name '}>{ nickname || '请登录 >'}</View>
              <View>
                <View className="msg" data-url="/pages/message/index" onClick={this.goToPage}>
                  <Image mode="widthFix" src={message_img} />
                </View>
                <View className="msg" onClick={this.outLogin}>
                  <Image mode="widthFix" src="http://static-r.msparis.com/uploads/9/a/9a00ce9a5953a6813a03ee3324cbad2a.png" />
                </View>
              </View>
            </View>
            <View className="avatar-container">
              <Image className="avatar" src={avatar_img} />
            </View>
          </View>
          <View className="list">
            {list && list.map((item, index) => (
              <View className="item" key={index} data-url={`/pages/order/index?type=${index}`} onClick={this.goToPage}>
                <Image mode="widthFix" src={item.img} />
                <Text>{item.txt}</Text>
                {item.num > 0 && <Icon className="num">{item.num}</Icon>}
              </View>
            ))}
          </View>
        </View>
        <View className="login">
          <View className="card">
            <View className="type type0">
              <View className="operation">
                <View className="txt">{mobile ? 'VIP会员用户' : '您还不是会员'}</View>
                {!mobile && (
                  <View className="btn" data-url="/pages/login/index" onClick={this.goPage}>
                    成为会员
                    <View className="iconfont icon-membership_more"></View>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="item" data-url="/pages/couponList/index" onClick={this.goToPage}>
            <View className="left">
              <Image className="icon-left" src={coupon_img} />
              <Text>优惠券</Text>
            </View>
            <View className="right">
              {coupon_number && <View className="num">{coupon_number}</View>}
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
