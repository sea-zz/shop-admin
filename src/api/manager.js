import axios from '@/request/axios';

export const login = (username, password) => {
  return axios.post('/admin/login', {
    username, password
  });
}

export const getUserInfo = () => {
  return axios.post('/admin/getinfo');
}

export const logout = () => {
  return axios.post('/admin/logout');
}

export const resetPass = (data) => {
  return axios.post('/admin/updatepassword', data);
}

// 管理员列表
export const getManagerList = (params) => {
  return axios.get('/admin/manager/list', { params });
};

// 添加管理员
export const addManager = (data) => {
  return axios.post('/admin/manager/add', data);
};

// 编辑管理员
export const editManager = (data) => {
  return axios.post('/admin/manager/edit', data);
};

// 删除管理员
export const deleteManager = (id) => {
  return axios.post('/admin/manager/delete', { id });
};
