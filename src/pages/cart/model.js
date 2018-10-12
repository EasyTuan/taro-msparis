import Taro from '@tarojs/taro';
import * as cartApi from './service';

export default {
  namespace: 'cart',
  state: {
    items: Taro.getStorageSync('items') || [{
      brand: "DVF",//
images: "http://static-r.msparis.com/uploads/products/c/1/c1870306f7ec03292cdc4990ee0f46c8.jpg",
name: "test987",//
product_id: 23146,//
product_price: 2000,
specification: "中码XXXL",//
spu: "TEST987",//
type: 1,//
    },{
      brand: "DVF",
images: "http://static-r.msparis.com/uploads/products/d/6/d6586adc5c48b47e3e0cb2c49ceb50ed.jpeg",
name: "test987",
product_id: 22861,
product_price: 2000,
specification: "中码XXXL",
spu: "TEST987",
type: 1,
    }],
  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(cartApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
