import Request from '../../utils/request';

// 获取省市区列表
export const getDistricts = data => Request({
  url: '/common/configs',
  method: 'GET',
  data,
});

// 更新地址
export const updateAddress = data => Request({
  url: '/user/address',
  method: 'POST',
  data,
});
