import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/users'
// users/putMyPassword //修改密码
export function putMyPassword(data) {
  return request({
      url: `${RESOURCE_BASE_PATH}/putMyPassword`,
      method: "POST",
      data
  });
}



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

export function getMe() {
  return request({
    url: `${RESOURCE_BASE_PATH}/getMyUser`,
    method: 'get'
  })
}

export function post(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/post`,
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

export function remove(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delete`,
    method: 'post',
    data: data
  })
}

export function putStatus(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putStatus`,
    method: 'post',
    data: data
  })
}

export function putPassword(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putPassword`,
    method: 'post',
    data: data
  })
}

export function putRoles(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/putRoles`,
    method: 'post',
    data: data
  })
}

