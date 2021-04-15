import api from '../service/api'

export const getData = async (url: string) => {
  const res = await api.get(url)
  return res.data.data
}
export const getHome = async () => {
  const data = await getData('/homepage-v3')
  const banner: [] = data.banner
  const brands: [] = data.brands
  return { banner, brands }
}
export const getProducts = async () => {
  const data = await getData('/product/filter')
  const products: [] = data.rows
  return { products }
}
