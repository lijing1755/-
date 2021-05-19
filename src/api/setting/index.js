import request from "@/utils/request";

const RESOURCE_BASE_PATH = "/system/carousel";
const BASE_PATH = "/system/campusShow";


export function list(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}`,
    method: "GET",
    params: data
  });
}
// 新建轮播图
export function add(data) {
  return request({
    url: `${RESOURCE_BASE_PATH}`,
    method: "POST",
    data
  });
}

// 编辑轮播图
export function edit(id, data) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: "PUT",
    data
  });
}
// 删除轮播图
export function del(id) {
  return request({
    url: `${RESOURCE_BASE_PATH}/${id}`,
    method: "DELETE"
  });
}
// 风光
export function show_list(data) {
  return request({
    url: `${BASE_PATH}`,
    method: "GET",
    params: data
  });
}
// 新建风光
export function show_add(data) {
  return request({
    url: `${BASE_PATH}`,
    method: "POST",
    data
  });
}

// 编辑风光
export function show_edit(id, data) {
  return request({
    url: `${BASE_PATH}/${id}`,
    method: "PUT",
    data
  });
}
// 删除风光
export function show_del(id) {
  return request({
    url: `${BASE_PATH}/${id}`,
    method: "DELETE"
  });
}
// 详情
export function campusShow(id) {
  console.log(id,'iddddd')
  return request({
    url: `${BASE_PATH}/${id}`,
    method: "GET"
  });
}

