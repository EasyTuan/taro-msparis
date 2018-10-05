import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
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
    const { banner } = this.props;
    return (
      <View className="home-page">
        <Swiper
          circular
          indicatorDots
          indicatorColor='#999'
          indicatorActiveColor='#333'
          autoplay>
          { banner.map((item, index) => (
            <SwiperItem key={index}>
              <Image style="width:100%;" mode="widthFix" src={item.image_src}></Image>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}

