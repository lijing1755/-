import request from '@/utils/request'

const RESOURCE_BASE_PATH = '/system'

export function upload(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/uploadFile`,
    method: 'post',
    data: data
  })
}
export function uploadPdf(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/uploadPdf`,
    method: 'post',
    data: data
  })
}
export function uploadVideo(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/uploadVideo`,
    method: 'post',
    data: data
  })
}
export function uploadExcel(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/uploadExcel`,
    method: 'post',
    data: data
  })
}
