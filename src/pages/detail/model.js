import * as detailApi from './service';

export default {
  namespace: 'detail',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(detailApi.demo, {});
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
