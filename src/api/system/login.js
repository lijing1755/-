import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/login',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/system/logout',
    method: 'post'
  })
}

export function getCaptcha() {
  return request({
    url: '/system/captcha',
    method: 'get'
  })
}
