import Taro from '@tarojs/taro';
import * as addressUpdateApi from './service';

export default {
  namespace: 'addressUpdate',
  state: {
    addressId: '',
    cities: [],
    districts: [],
    pickerValue: [0,0,0],
    showValue: {
      region_code: '',
      region_name: '',
    },
    contact_name: '',
    contact_mobile: '',
    address_detail: '',
  },

  effects: {
    * getDistricts({ payload }, { put, call }) {
      const { status ,data } = yield call(addressUpdateApi.getDistricts, payload);
      if(status === 'ok') {
        const cities = data.send_cities.send_cities;
        const arr = [[],[],[]];
        cities.forEach(item => {
          arr[0].push({
            key: item.key,
            name: item.name,
          })
        });
        cities[0].cities.forEach(item => {
          arr[1].push({
            key: item.key,
            name: item.name,
          })
        });
        cities[0].cities[0].regions.forEach(item => {
          arr[2].push({
            key: item.key,
            name: item.name,
          })
        });
        yield put({
          type: 'save',
          payload: {
            cities,
            districts: arr,
          },
        });
      }
    },
    * submit({ payload }, { select, put, call }) {
      const { access_token } = yield select(state => state.common);
      const { addressId } = yield select(state => state.addressUpdate);
      const { status } = yield call(addressUpdateApi.updateAddress, {
        id: addressId,
        access_token,
        region_code: payload.showValue.region_code,
        region_name: payload.showValue.region_name,
        contact_name: payload.contact_name,
        contact_mobile: payload.contact_mobile,
        address_detail: payload.address_detail,
      });
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            cities: [],
            districts: [],
            pickerValue: [0,0,0],
            showValue: {
              region_code: '',
              region_name: '',
            },
            contact_name: '',
            contact_mobile: '',
            address_detail: '',
          },
        });
        Taro.navigateBack();
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
