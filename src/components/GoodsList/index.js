import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class GoodsList extends Component {
  static propTypes ={
    list: PropTypes.array,
  }

  static defaultProps = {
    list: [],
  };

  gotoDetail = (e) => {
    // Taro.navigateTo({
    //   url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`,
    // })
  }

  render() {
    const { list } = this.props;
    return (
      <View className="goods-list-container">
        {
        list.length > 0 ? (
          <View className="goods-ul">
            {
              list.map((item, index) => (
                <View key={index} className="goods-li" data-id={item.id} onClick={ this.gotoDetail }>
                  <View className="pos">
                    <View className="Image-container">
                      <Image src={item.cover_image ? `${item.cover_image}!w750` : 'http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png'} alt="" />
                    </View>
                    {
                      item.mode_id == 3 && (item.enabled != 1 || item.sale_stock == 0) && (
                        <View className="sold-out">
                          <View className="sales-end">已售罄</View>
                        </View>
                      )
                    }
                    {
                      item.enabled && item.enabled != 0 && item.enabled != 1 && item.enabled != 2 && (
                        <View className="unable">
                          <View className="sales-end">下架</View>
                        </View>
                      )
                    }
                  </View>
                  <View className="zan-capsule">
                    {item.type_id == 2 && item.mode_id == 1 && <View className="zan-capsule__left">VIP</View>}
                    {item.limit_tag && item.limit_tag != '' && <View className="zan-capsule__center">{item.limit_tag}</View>}
                    {item.market_price / 100 > 500 && (
                      <View className="zan-capsule__right">
                        参考价¥
                        {item.market_price / 100}
                      </View>
                    )}
                  </View>
                  <Text className="dark">{item.brand}</Text>
                  <Text>{item.name}</Text>
                </View>
              ))
            }
          </View>
        ) : (
          <View />
        )
      }
      </View>
    );
  }
}

export default GoodsList;
