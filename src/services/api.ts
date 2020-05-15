import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { baseUrl } from '../config'
import { logError } from '../utils/error'


export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params

    type OptionType = {
        isShowLoading:boolean,
        loadingText:string,
        url:string,
        data?:object | string,
        method?: any,
        header: object,
        success: any,
        error: any,
    }

    // encodeURIComponent(Taro.getStorageSync('token'))
    const option :OptionType= {
      isShowLoading: true,
      loadingText: '正在加载',
      url: baseUrl + url  ,
      data: data,
      method: method,
      header: { 
          'content-type': 'application/x-www-form-urlencoded',
          'API-XUID': 1,
          'access_token':Taro.getStorageSync('token')
      },
      success(res) {
        
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }

      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }

    if (url.indexOf('/user/learn/') == -1 ) {
        if(url.indexOf('/course/live') == -1){
          Taro.showToast({
            title: '加载中',
            icon:'loading',
            duration: 1000
          })
        }
    }
    
    return Taro.request(option)
  },
  get(url, data?:object) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data?:object) {
    let params = { url, data }
    return this.baseOptions(params, 'POST')
  },
  put(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: object) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
