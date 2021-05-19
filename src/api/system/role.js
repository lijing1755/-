import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/roles'

export function lists(query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/lists`,
    method: 'get',
    params: query
  })
}

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

export function put(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/put`,
    method: 'post',
    data: data
  })
}
// 编辑角色名称
export function editRole(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/put`,
    method: 'post',
    data: data
  })
}

export function remove(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delete`,
    method: 'post',
    data: data
  })
}

export function patchStatus(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putStatus`,
    method: 'post',
    data: data
  })
}

export function listRules(id) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}/rules`,
    method: 'get'
  })
}

export function putRules(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putRules`,
    method: 'post',
    data: data
  })
}
