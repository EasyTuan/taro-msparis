import Taro, { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

export default class MySwiper extends Component {
  static propTypes = {
    banner: PropTypes.array,
  };

  static defaultProps = {
    banner: [],
  };

  render() {
    const { banner } = this.props;
    return (
      <Swiper
        className="swiper-container"
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
        autoplay>
        { banner.map((item, index) => (
          <SwiperItem key={index}>
            <Image className="swiper-img" mode="widthFix" src={item.image_src}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

