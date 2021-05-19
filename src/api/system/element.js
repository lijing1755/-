import request from '@/utils/request'

// 获取后台分组标识
export function getSysGroups(params) {
  return request({
    url: '/system/getSysGroups',
    method: 'get',
    params: params
  })
}

export function listTree(params) {
  console.log(params)
  return request({
    url: '/system/elements/listTree',
    method: 'get',
    params: params
  })
}

export function listMyTree(depth = -1, type = []) {
  return request({
    url: '/system/elements/listMyTree',
    method: 'get',
    params: {
      depth: depth,
      types: type
    }
  })
}

export function addElement(data) {
  return request({
    url: '/system/elements/post',
    method: 'post',
    data: data
  })
}

export function removeElement(data) {
  return request({
    url: `system/elements/delete`,
    method: 'post',
    data: data
  })
}

export function editElement(data) {
  return request({
    url: `system/elements/put`,
    method: 'post',
    data: data
  })
}
