import request from '@/utils/request'

const BASE_PATH = '/system/index'

// 获取启动图详情
export function headPageInfo(params) {
    return request({
      url: `${BASE_PATH}/headPageInfo`,
      method: 'get',
      data: params
    })
}
// 编辑启动图详情
export function editHeadPage(params) {
    return request({
      url: `${BASE_PATH}/editHeadPage`,
      method: 'post',
      params: params
    })
}
// 端午PV数据--点击活动商品，进入详情的PV
export function activityPvDetail(params) {
  return request({
    url: `${BASE_PATH}/activityPvDetail`,
    method: 'get',
    params: params
  })
}
// 端午PV数据--点击进入活动页PV
export function activityPvList(params) {
  return request({
    url: `${BASE_PATH}/activityPvList`,
    method: 'get',
    params: params
  })
}
// 活动商品购买的数据，所有都统计
export function buyGoodsPvNum(params) {
  return request({
    url: `${BASE_PATH}/buyGoodsPvNum`,
    method: 'get',
    params: params
  })
}
// 活动期间新增注册用户和这段时间注册了，并已下单的用户
export function userBuyPvNum(params) {
  return request({
    url: `${BASE_PATH}/userBuyPvNum`,
    method: 'get',
    params: params
  })
}
// 用户通过活动商品发起了团，统计发了多少团，未发起团的用户不做统计
export function userGroupPvNum(params) {
  return request({
    url: `${BASE_PATH}/userGroupPvNum`,
    method: 'get',
    params: params
  })
}