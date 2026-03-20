import axios from 'axios';
import { getCookie, LOGIN_TOKEN } from '@/common/utils/cookie';
import { ElNotification } from 'element-plus';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
});

axiosInstance.interceptors.request.use(config => {
  const token = getCookie(LOGIN_TOKEN);
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  console.error('request', error);
});

axiosInstance.interceptors.response.use(response => {
  const errMsg = response?.data?.msg || '请求失败';
  if (response?.data?.msg && response?.data?.msg !== 'ok') {
    console.error(errMsg);
    ElNotification({
      message: errMsg,
      type: 'error',
      duration: 2000,
    });
  }
  return response?.data?.data;
}, error => {
  ElNotification({
    message: error?.response?.data?.msg || '请求失败',
    type: 'error',
    duration: 2000,
  });
  return Promise.reject(error);
});

export default axiosInstance;
