import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    access_token: '',
    mobile: '',
    nickname: '',
    new_user: '',
    is_has_buy_card: '',
    erroMessage: '',
  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
