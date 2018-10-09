import Request from '../../utils/request';

// 老用户登录
export const login = data => Request({
  url: '/user/login',
  method: 'POST',
  data,
});

// 获取手机验证码
export const getSms = data => Request({
  url: '/common/sms',
  method: 'GET',
  data,
});

// 获取语音验证码
export const getSmsVoice = data => Request({
  url: '/common/voice',
  method: 'GET',
  data,
});

// 发券
export const getReceive = data => Request({
  url: '/coupon/receive-v2',
  method: 'POST',
  data,
});

