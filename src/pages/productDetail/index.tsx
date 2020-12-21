import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import useDetailModel from '../../models/Detail'
import classnames from 'classnames'
import measure_icon from '../../images/icon/measure.png'
import { Comment } from '../../components/comment/index'
import './index.scss'

const ProductDetail: Taro.FC = () => {
  const detailModel = useDetailModel()
  const {
    image,
    brand,
    limit_tag_ids,
    name,
    product_spu,
    buyer_Info,
    designer_comment,
    measurement,
    comments,
    brand_desc,
  } = detailModel.DetailState
  const size = ['中码XS号', '中码S号', '中码M号', '中码L号']
  const measure = measurement.split('\n')
  const { id } = Taro.getCurrentInstance()?.router?.params || {}
  const ID = Number(id || 0) //46091
  useEffect(() => {
    detailModel.updateDetail(ID)
  }, [])
  return (
    <View className="index">
      <Swiper
        className="banner"
        indicatorColor="#999"
        indicatorActiveColor="#ec7063"
        easingFunction="easeInOutCubic"
        indicatorDots
        autoplay
        circular
      >
        {image.map((item, index) => (
          <SwiperItem key={index} className="banner_item">
            <Image src={item} style={{ width: '98%' }} mode="widthFix" />
          </SwiperItem>
        ))}
      </Swiper>
      <View className="brand">{brand}</View>
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
          <View className="name">{name}</View>
        </View>
      )}
      <View className="spu">{product_spu}</View>
      <View className="size">
        {size.map((item) => (
          <View className="item">{item}</View>
        ))}
      </View>
      <View className="checksize">查看各国尺码转换表</View>
      <View className="hr" />
      <View className="buyer">
        <Text>买手点评</Text>
        <View className="info">
          <Image
            src={buyer_Info.avatar}
            style={{ width: '30PX' }}
            mode="widthFix"
          />
          <View className="text">
            <View>{buyer_Info.nickname}</View>
            <View>女神派时尚买手</View>
            <View>{designer_comment}</View>
          </View>
        </View>
      </View>
      <View className="detail">
        <Text>美衣详情</Text>
        <View className="head">
          <Image src={measure_icon} style={{ width: '20PX' }} mode="widthFix" />
          <View className="measure">平铺测量</View>
        </View>
        <View className="info">
          {measure.map((item) => (
            <View>{item}</View>
          ))}
        </View>
      </View>
      <View className="comments">
        <View>{`优质评价(${comments.total})`}</View>
        {comments.rows.map((item) => (
          <Comment item={item} />
        ))}
      </View>
      <View className="intro">
        <View>品牌介绍</View>
        <View>{`${brand}  →`}</View>
        <View>{brand_desc}</View>
      </View>
      <View>服务说明</View>
      <View>foot</View>
    </View>
  )
}
export default ProductDetail
