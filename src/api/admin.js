import axios from '@/request/axios';

/**
 * 订单量、销售额、新增用户
 */
export const statistics1 = () => {
  return axios.get('/admin/statistics1');
}

/**
 * 商品、交易提示
 */
export const statistics2 = () => {
  return axios.get('/admin/statistics2');
}

/**
 * 统计
 * 周：week 月：month 小时：hour
 */
export const statistics3 = (type = 'week') => {
  return axios.get('/admin/statistics3?type=' + type);
}


