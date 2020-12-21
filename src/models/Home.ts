import { useState } from 'react'
import { createModel } from 'hox'
import { getHome, getProducts } from '../actions/home_action'

interface IState {
  banner: Array<{ id: number; image_src: string }>
  brands: Array<{ id: number; image_src: string }>
  products: Array<{
    id: number
    cover_image: string
    brand: string
    name: string
    market_price: number //市场价，需要去掉两个0
    limit_tag_ids: Array<{ id: number; name: string }> //VIP、年卡
  }>
  page: number
  loading: boolean
}
function useHome() {
  const [homeState, setHome] = useState<IState>({
    banner: [],
    brands: [],
    products: [],
    page: 1,
    loading: false,
  })
  const updateHome = async (page: number, loading: boolean) => {
    console.log('prevState', homeState)
    const { banner, brands } = await getHome()
    const defProduct = (await getProducts()).products
    const products = [...homeState.products,...defProduct]
    const newHomeState = {
      ...homeState,
      banner,
      brands,
      products,
      page,
      loading,
    }
    setHome(newHomeState)
    console.log('nextState', newHomeState)
  }
  return {
    homeState,
    updateHome,
  }
}

export default createModel(useHome)
