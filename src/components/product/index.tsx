import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

interface IProps {
  item: {
    id: number
    cover_image: string
    brand: string
    name: string
    market_price: number
    limit_tag_ids: {
      id: number
      name: string
    }[]
  }
}
export const Product: Taro.FC<IProps> = (props) => {
  const { item } = props
  const { cover_image, brand, name, market_price, limit_tag_ids } = item
  const price = market_price / 100
  return (
    <View className="product">
      <Image
        className="cover"
        src={
          cover_image
            ? `${cover_image}`
            : 'http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png'
        }
        mode="widthFix"
        style="width:100%;margin:0 auto;margin-bottom:5PX"
      />
      {limit_tag_ids && (
        <View className="tags">
          {limit_tag_ids.map((item) => {
            return (
              <View
                className={classnames({
                  tag: true,
                  vip: item.name === 'VIP',
                  year_card: item.name === '年卡',
                })}
                key={item.id}
              >
                {item.name === '年卡' ? '年卡专享' : 'VIP'}
              </View>
            )
          })}
          <View className="price">{`参考价￥${price ? price : '520'}`}</View>
        </View>
      )}
      <View className="brand">{brand}</View>
      <View className="name">{name}</View>
    </View>
  )
}
