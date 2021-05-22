import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/activity'
const  SHOP_BASE_PATH = '/system/shop'
const  BASE_PATH = '/system'
// 模块列表
export function moduleList(params) {
    return request({
      url: `${RESOURCE_BASE_PATH}/moduleList`,
      method: 'get',
      params: params
    })
}
// 删除模板
export function delModule(params) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delModule`,
    method: 'get',
    params: params
  })
}
// 模板详情
export function moduleInfo(params) {
  return request({
    url: `${RESOURCE_BASE_PATH}/moduleInfo`,
    method: 'get',
    params: params
  })
}

//商家列表
export function goodsList(params) {
    return request({
      url: `${SHOP_BASE_PATH}/goodsList`,
      method: 'post',
      data: params
    })
}

// 商品列表
export function shopList(params) {
    return request({
      url: `${SHOP_BASE_PATH}/shopList`,
      method: 'post',
      data: params
    })
}

// 编辑模板
export function editModule(params) {
    return request({
      url: `${RESOURCE_BASE_PATH}/editModule`,
      method: 'post',
      data: params
    })
}
// 活动列表
export function activityList(params) {
    return request({
      url: `${RESOURCE_BASE_PATH}/activityList`,
      method: 'get',
      params: params
    })
}

// 活动详情
export function activityInfo(params) {
    return request({
      url: `${RESOURCE_BASE_PATH}/activityInfo`,
      method: 'get',
      params: params
    })
}

// 编辑活动
export function editActivity(params) {
  return request({
    url: `${RESOURCE_BASE_PATH}/editActivity`,
    method: 'post',
    data: params
  })
}

// 删除活动
export function delActivity(params) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delActivity`,
    method: 'get',
    params: params
  })
}