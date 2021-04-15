import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface IProps {
  item: {
    comment: string
    user_pic: string
    nickname: string
    fit_score: number
    images: Array<{
      image_url: string
      width: number
    }>
  }
}
export const Comment: Taro.FC<IProps> = (props) => {
  const { item } = props
  const { comment, user_pic, nickname, fit_score, images } = item
  const fit: string =
    fit_score === 1 ? '尺码偏小' : fit_score === 2 ? '尺码合适' : '尺码偏大'
  return (
    <View className="comment">
      <View className="info">
        <Image src={user_pic} style={{ width: '30PX' }} mode="widthFix" />
        <View className="text">
          <View>{nickname}</View>
          <View>{fit}</View>
          <View>{comment}</View>
        </View>
      </View>
      <View className="images">
        {images?.map((item) => (
          <Image
            src={item.image_url}
            style={{ width: '60PX' }}
            mode="widthFix"
            className="item"
          />
        ))}
      </View>
    </View>
  )
}
