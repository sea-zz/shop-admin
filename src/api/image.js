import axios from '@/request/axios';

/**
 * 图片分类
 */
export const getImageCate = (page = 1) => {
  return axios.get(`/admin/image_class/${page}`);
}

export const delImageCate = (id) => {
  return axios.post(`/admin/image_class/${id}/delete`);
}

/**
 * 分类下列表
 * @param {*} cate 分类id
 * @param {*} page 页码
 * @returns 
 */
export const getImageCateList = (cate, page = 1) => {
  return axios.get(`/admin/image_class/${cate}/image/${page}`);
}

// 
