import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

const My: Taro.FC = () => {
  return (
    <View className="index">
      <View
        onClick={() => {
          Taro.navigateTo({
            url: '../login/index',
          })
        }}
      >
        请登录
      </View>
    </View>
  )
}
export default My
