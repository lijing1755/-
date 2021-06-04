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