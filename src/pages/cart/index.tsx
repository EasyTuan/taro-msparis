import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import cart from '../../images/icon/cart.png'
import './index.scss'

const Cart: Taro.FC = () => {
  return (
    <View className="index">
      <View
        style={{
          background: `url(${cart}) center no-repeat`,
          backgroundSize: 'cover',
          width: 50,
          height: 50,
          borderRadius: '50%',
          opacity: 0.5,
        }}
      />
      <View
        style={{
          fontSize: 10,
          color: '#a49f9f',
          margin: '10px 0',
        }}
      >
        您的衣袋为空
      </View>
      <View
        onClick={() => {
          if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
            Taro.navigateTo({
              url: '/pages/home/index',
            }) //h5没有tabbar
          } else {
            Taro.switchTab({
              url: '/pages/home/index',
            })
          }
        }}
        style={{
          background: '#ec7063',
          width: 200,
          height: 30,
          lineHeight: '30px',
          textAlign: 'center',
          borderRadius: 20,
          fontSize: 10,
          color: '#eeeeee',
        }}
      >
        立即去挑选美衣
      </View>
    </View>
  )
}
export default Cart
