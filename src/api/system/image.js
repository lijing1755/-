import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system/extend/image'

export function upload(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/upload`,
    method: 'post',
    data: data
  })
}

export function remove(target, fileName) {
  return request({
    url: `${RESOURCE_BASE_PATH}/delete/${target}/${fileName}`,
    method: 'delete'
  })
}
