import Taro from '@tarojs/taro';
import * as login from './service';

export default {
  namespace: 'login',
  state: {
    mobile: '',
    code: '',
    invitation_code: '',
    invitation_code_from: '',
    access_token: '',
    nickname: '',
    new_user: '',
    is_has_buy_card: '', // 用户是否买过卡
    smsText: '发送验证码',
    sending: 0,
    smsTime: 30,
    erroMessage: '',
    type: 4, // 1微信 2QQ 3新浪 4.微信公众号 5.支付宝生活号 6.京东 7.返利
  },

  effects: {
    * login(_, { call, put, select }) {
      const { code, mobile } = yield select(state => state.login);
      const res = yield call(login.login, { code, mobile});
      if (res.status == 'ok') {
        const userInfo = {
          access_token: res.data.access_token,
          invitation_code: res.data.invitation_code,
          mobile: res.data.mobile,
          nickname: res.data.nickname,
          new_user: res.data.new_user,
          is_has_buy_card: res.data.is_has_buy_card,
          erroMessage: '',
        };

        Taro.setStorageSync('user_info', userInfo);
        Taro.setStorageSync('access_token', res.data.access_token);

        yield put({ type: 'common/save',
          payload: {
            access_token: res.data.access_token,
            invitation_code: res.data.invitation_code,
            mobile: res.data.mobile,
            nickname: res.data.nickname,
            new_user: res.data.new_user,
            is_has_buy_card: res.data.is_has_buy_card,
            erroMessage: '',
          },
        });

        yield put({ type: 'save',
          payload: {
            access_token: res.data.access_token,
            invitation_code: res.data.invitation_code,
            mobile: res.data.mobile,
            nickname: res.data.nickname,
            new_user: res.data.new_user,
            is_has_buy_card: res.data.is_has_buy_card,
            erroMessage: '',
          },
        });

        Taro.showToast({
          title: '登录成功，欢迎回来～～～',
          icon: 'none',
        });

        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    },

    * sendSms(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSms, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({ type: 'save', payload: { sending: 2, erroMessage: res.error && res.error.message } });
      }
    },

    * sendSmsVoice(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSmsVoice, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({ type: 'save', payload: { sending: 2, erroMessage: res.error && res.error.message } });
      }
    },
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },

};
