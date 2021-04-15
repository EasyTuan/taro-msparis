import api from '../service/api'

export const getDetail = async (id: number) => {
  const res = await api.get('/product', { id: id })
  return res.data.data
}
