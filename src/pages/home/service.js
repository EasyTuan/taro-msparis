import Request from '../../utils/request';

export const homepage = data => Request({
  url: '/homepage-v3',
  method: 'GET',
  data,
});
