import Request from '../../utils/request';

export const getAddressList = data => Request({
  url: '/user/address',
  method: 'GET',
  data,
});
