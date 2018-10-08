import Request from '../../utils/request';

// 获取商品详情
export const getProductInfo = params => Request({
  url: '/product',
  method: 'GET',
  data: params,
});

// 为你推荐列表
export const recommendYou = params => Request({
  url: '/product/recommend-v2',
  method: 'GET',
  data: params,
});

// 检查尺寸是否可加入购物车
export const checkStock = params => Request({
  url: '/longrent/stock',
  method: 'GET',
  data: params,
});

// 加入衣袋
export const joinCart = params => Request({
  url: '/longrent/product',
  method: 'POST',
  data: params,
});

// 获取衣袋件数
export const getClothesAmount = params => Request({
  url: '/plans/amount',
  method: 'GET',
  data: params,
});
