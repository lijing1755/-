import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/rules'

export function lists(query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/lists`,
    method: 'get',
    params: query
  })
}

// 获取权限集信息（包含绑定的元素、接口）
export function get(query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/get`,
    method: 'get',
    params: query
  })
}

export function post(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/post`,
    method: 'post',
    data: data
  })
}

export function editName(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/put`,
    method: 'post',
    data: data
  })
}

export function remove(query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delete`,
    method: 'post',
    params: query
  })
}

export function patchStatus(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putStatus`,
    method: 'post',
    data: data
  })
}

// 获取权限集信息（包含绑定的元素、接口）
export function listResources(id, resource_type) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}/resources/${resource_type}`,
    method: 'get'
  })
}

export function putResources(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putResources`,
    method: 'post',
    data: data
  })
}
