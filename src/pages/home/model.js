import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    banner: []
  },
  effects: {
    * load(_, {call, put}) {
      const { status, data } = yield call(homeApi.homepage, {
        platform: 'wap',
        rent_mode: 2
      });
      if (status === 'ok') {
        yield put({ type: 'save',payload: {
          banner: data.banner
        } });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    },
  },
};
