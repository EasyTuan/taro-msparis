//定义api地址
import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { baseUrl } from '../config' // https://ms-api.caibowen.net
import { logError } from '../utils/error'

interface IOption {
  url: string
  data?: object | string
  method: any
  header: Object
  success: any
  fail: any
  xhrFields: object
}
interface IRes {
  header: {
    'Set-Cookies': string
  }
}
const api = {
  baseOptions: function (params, method) {
    const { url, data } = params
    let contentType = 'application/json'
    contentType = contentType || params.contentType
    //由于微信小程序没有cookie机制，所以需要人为地保存Set-Cookies的值到LocalStorage中，下次发起请求时调用
    const setCookie = (res: IRes) => {
      if (res.header && res.header['Set-Cookies']) {
        Taro.setStorageSync('Cookies', res.header['Set-Cookies'])
      }
    }
    const option: IOption = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'context-type': contentType,
        cookie: Taro.getStorageSync('Cookies'),
      },
      xhrFields: { withCredentials: true },
      success: (res) => {
        setCookie(res)
        if (res.statusCode === HTTP_STATUS.not_found) {
          return logError('请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.error) {
          return logError('请求有误')
        } else if (res.statusCode === HTTP_STATUS.bad_gateway) {
          return logError('服务器异常')
        } else if (res.statusCode === HTTP_STATUS.forbidden) {
          return logError('没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.moved) {
          Taro.clearStorage()
          Taro.navigateTo({ url: '/pages/login/index' })
          return logError('请先登录')
        } else if (res.statusCode === HTTP_STATUS.success) {
          return res.data
        }
      },
      fail: () => {
        logError('接口异常')
      },
    }
    return Taro.request(option)
  },
  get: function (url: string, data?: Object) {
    const params = { url, data }
    return this.baseOptions(params, 'get')
  },
  post: function (url: string, data?: Object, contentType?: string) {
    const params = { url, data, contentType }
    return this.baseOptions(params, 'post')
  },
  delete: function (url: string, data?: Object) {
    const params = { url, data }
    return this.baseOptions(params, 'delete')
  },
}
export default api
