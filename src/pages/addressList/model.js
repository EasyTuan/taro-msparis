import * as addressListApi from './service';

export default {
  namespace: 'addressList',
  state: {
    addressList: [],
  },

  effects: {
    * getAddressList(_, { call, put, select }) {
      const { access_token } = yield select(state => state.common);
      const { status, data } = yield call(addressListApi.getAddressList, {access_token});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            addressList: data.rows,
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
