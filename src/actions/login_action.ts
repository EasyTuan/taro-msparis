import api from '../service/api'

export const login = async (data) => {
  const res = await api.post('/login/login', { data })
  console.log(res)
  return res
}
export const getSms = async (data) => {
  const res = await api.get('/common/sms', { data })
  console.log(res)
  return res
}
