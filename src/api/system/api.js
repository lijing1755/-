import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/apis'

export function lists(params) {
  return request({
    url: RESOURCE_BASE_PATH,
    method: 'get',
    params: params
  })
}

export function post(data) {
  return request({
    url: RESOURCE_BASE_PATH,
    method: 'post',
    data: data
  })
}

export function remove(id) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'delete'
  })
}

export function put(id, data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'put',
    data: data
  })
}

export function putApiTags(id, api_tag_ids) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}/tags`,
    method: 'put',
    api_tag_ids
  })
}

export function reload(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/reload`,
    method: 'post',
    data: data
  })
}
