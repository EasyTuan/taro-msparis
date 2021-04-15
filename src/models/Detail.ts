import { useState } from 'react'
import { createModel } from 'hox'
import { getDetail } from '../actions/detail_action'

interface IState {
  id: number
  image: Array<''> //展示图
  limit_tag_ids: Array<{ id: number; name: string }> //VIP、年卡
  brand: string
  name: string
  product_spu: string //批次
  stocks: Array<{
    size: string
    sort: number
  }> //尺码和库存
  buyer_Info: {
    avatar: string
    nickname: string
  } //买手信息
  designer_comment: string //买手推荐语
  measurement: string //平铺测量
  comments: {
    rows: Array<{
      comment: string
      user_pic: string
      nickname: string
      fit_score: number
      images: Array<{
        image_url: string
        width: number
      }>
    }>
    total: number
  } //评论
  brand_desc: string
}
function useDetail() {
  const [DetailState, setDetail] = useState<IState>({
    id: 0,
    image: [''],
    limit_tag_ids: [],
    brand: '',
    name: '',
    product_spu: '',
    stocks: [],
    buyer_Info: {
      avatar: '',
      nickname: '',
    },
    designer_comment: '',
    measurement: '',
    comments: {
      rows: [],
      total: 0,
    },
    brand_desc: '',
  })
  const updateDetail = async (id: number) => {
    console.log('prevState', DetailState)
    const data = await getDetail(id)
    setDetail(data)
    console.log('nextState', data)
  }
  return {
    DetailState,
    updateDetail,
  }
}

export default createModel(useDetail)
