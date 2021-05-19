import Cookies from 'js-cookie'

// 生明key
const keys = {
  token: 'Admin-Token'
}

//操作方法
export function getCookie(key) {
  return Cookies.get(keys[key])
}

export function setCookie(key,value) {
  return Cookies.set(keys[key], value)
}

export function removeCookie(key) {
  return Cookies.remove(keys[key])
}
