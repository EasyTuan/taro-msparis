import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
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
    this.props.dispatch({
      type: 'home/product',
    });
  };

  render() {
    const { banner, brands, products_list } = this.props;
    return (
      <View className="home-page">
        <MySwiper banner={banner} home />
        <View className="nav-list">
          { brands.map((item, index) => (
            <View className="nav-item" key={index}>
              <Image mode="widthFix" src={item.image_src}></Image>
            </View>
          ))}
        </View>
        <Text className="recommend">为你推荐</Text>
        <GoodsList list={products_list} />
      </View>
    )
  }
}

