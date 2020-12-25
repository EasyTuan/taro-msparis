import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import classnames from 'classnames'
import useDetailModel from '../../models/Detail'
import measure_icon from '../../images/icon/measure.png'
import { Comment } from '../../components/comment/index'
import './index.scss'

const I1 =
  'http://static-r.msparis.com/uploads/d/6/d646e479e328e9f370462b51fb841e70.png'
const I2 =
  'http://static-r.msparis.com/uploads/1/3/137d9963d13a053a6a81784af1256aa9.png'
const I3 =
  'http://static-r.msparis.com/uploads/c/0/c0367921e38cc7fd33f63897b18a86ef.png'

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
  const sercvice_desc = [
    { id: 1, desc: { first: '每次4件', second: '无限换穿' }, src: I1 },
    { id: 2, desc: { first: '五星洗护', second: '往返包邮' }, src: I2 },
    { id: 3, desc: { first: '一键还衣', second: '快递上门' }, src: I3 },
  ]
  const measure = measurement.split('\n')
  const { id } = Taro.getCurrentInstance()?.router?.params || {}
  const ID = Number(id || 0) //46091
  useEffect(() => {
    detailModel.updateDetail(ID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {size.map((item, index) => (
          <View className="item" key={index}>
            {item}
          </View>
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
          {measure.map((item, index) => (
            <View key={index}>{item}</View>
          ))}
        </View>
      </View>
      <View className="comments">
        <View>{`优质评价(${comments.total})`}</View>
        {comments.rows.map((item, index) => (
          <Comment item={item} key={index} />
        ))}
      </View>
      <View className="intro">
        <View>品牌介绍</View>
        <View>{`${brand}  →`}</View>
        <View>{brand_desc}</View>
      </View>
      <View className='service'>
        <View>服务说明</View>
        <View className="service_desc">
          {sercvice_desc.map((item) => (
            <View className="item" key={item.id}>
              <View className="first">
                <Image
                  src={item.src}
                  style={{ width: '100%' }}
                  mode="widthFix"
                />
              </View>
              <View className="second">
                <View>{item.desc.first}</View>
                <View>{item.desc.second}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
export default ProductDetail
