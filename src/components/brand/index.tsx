import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

interface IProps {
  key: number
  src: string
}
export const Brand: Taro.FC<IProps> = (props) => {
  const { key, src } = props
  return (
    <View
      key={key}
      className="item"
      style={{
        background: `url(${src}) center no-repeat`,
        backgroundSize: 'cover',
        width: '23%',
        height: '50%',
        marginLeft:"4PX",
        marginBottom:"4PX"
      }}
    />
  )
}
