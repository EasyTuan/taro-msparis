import React, { useEffect } from 'react'
import Taro, { navigateTo } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { Brand } from '../../components/brand/index'
import { Product } from '../../components/product/index'
import useHomeModel from '../../models/Home'
import loadImg from '../../images/icon/loading.png'
import './index.scss'

const Home: Taro.FC = () => {
  const homeModel = useHomeModel()
  const { banner, brands, products, page, loading } = homeModel.homeState

  //分享
  Taro.useShareAppMessage(() => {
    return {
      title: '基于Taro框架开发的时装衣橱',
      path: '/pages/home/index',
    }
  })
  Taro.useShareTimeline(() => {
    return {
      title: '基于Taro框架开发的时装衣橱',
      path: '/pages/home/index',
    }
  })
  Taro.useReachBottom(() => {
    let nextPage = page + 1
    homeModel.updateHome(nextPage, true)
  })
  useEffect(() => {
    homeModel.updateHome(1, false)
  }, [])
  const goDetail = (id: number) => {
    navigateTo({
      url: `../productDetail/index?id=${id}`,
    })
  }
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
        {banner.map((item) => (
          <SwiperItem key={item.id} className="banner_item">
            <Image
              src={item.image_src}
              style={{ width: '98%', borderRadius: '10PX' }}
              mode="widthFix"
            />
          </SwiperItem>
        ))}
      </Swiper>
      <View className="brands">
        {brands.map((item) => (
          <Brand key={item.id} src={item.image_src} />
        ))}
      </View>
      <View className="text">为你推荐</View>
      <View className="products">
        {products.map((item) => (
          <View
            className="product1"
            key={item.id}
            onClick={() => {
              goDetail(item.id)
            }}
          >
            <Product item={item} />
          </View>
        ))}
        {loading && (
          <View
            className="loading"
            style={{
              background: `url(${loadImg}) center no-repeat`,
              backgroundSize: 'cover',
              width: '60PX',
              height: '60PX',
            }}
          />
        )}
      </View>
    </View>
  )
}

export default Home
