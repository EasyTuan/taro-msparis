import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
