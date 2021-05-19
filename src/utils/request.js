import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
var arr = ['application/octet-stream', 'application/download', 'text/html; charset=utf-8', 'application/vnd.ms-excel']

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

service.defaults.headers.common['Content-Type'] = 'application/json'

// request拦截器
service.interceptors.request.use(
  config => {
    // param参数序列化
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' })

    // 存入token
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.school_id) {
      config.headers['C-Id'] = store.getters.school_id // 让每个请求携带校区id
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    console.log(response.headers['content-type'])
    console.log(response.headers)
    console.log(response)
    if (arr.indexOf(response.headers['content-type']) !== -1) {
      return response
    }
    /**
     * code为非10000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 10000) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 12100 || res.code === 12101) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log(error.response) // for debug
    const res = error.response.data
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
