import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system'

export function upload(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/uploadFile`,
    method: 'post',
    data
  })
}

export function get(id, query) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: 'get',
    params: query
  })
}
