import axios from '@/request/axios';

export const getNoticeList = (page) => {
  return axios.get(`/admin/notice/${page}`);
}

export const createNotice = (data) => {
  return axios.post('/admin/notice', data);
}

export const updateNotice = (id, data) => {
  return axios.post(`/admin/notice/${id}`, data);
}

export const deleteNotice = (id) => {
  return axios.post(`/admin/notice/${id}/delete`);
}

