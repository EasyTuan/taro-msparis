import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

const My: Taro.FC = () => {
  return (
    <View className="index">
      <View>Hello World</View>
    </View>
  )
}
export default My

