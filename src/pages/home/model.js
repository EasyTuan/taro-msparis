import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    banner: [],
    brands: [],
    products_list: [],
  },
  effects: {
    * load(_, {call, put}) {
      const { status, data } = yield call(homeApi.homepage);
      if (status === 'ok') {
        yield put({ type: 'save',payload: {
          banner: data.banner,
          brands: data.brands
        } });
      }
    },
    * product(_, {call, put}) {
      const { status, data } = yield call(homeApi.product, {
        mode: 1,
        type: 0,
        filter: 'sort:recomm|c:330602',
      });
      if (status === 'ok') {
        yield put({ type: 'save',payload: {
          products_list: data.rows,
        } });
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return {...state, ...payload};
    },
  },
};
