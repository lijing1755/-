import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/api_tags'

export function lists(query) {
  return request({
    url: RESOURCE_BASE_PATH,
    method: 'get',
    params: query
  })
}

export function get(id, query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'get',
    params: query
  })
}

export function post(data) {
  return request({
    url: RESOURCE_BASE_PATH,
    method: 'post',
    data: data
  })
}

export function put(id, data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'put',
    data: data
  })
}

export function patch(id, data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'patch',
    data: data
  })
}

export function remove(id) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'delete'
  })
}
