import * as detailApi from './service';

export default {
  namespace: 'detail',
  state: {
    imageObj: [],
    detail: {},
    goodsdata: {},
    cartAmount: 0,
    currentChooseId: '',
    specificationsList: [],
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
