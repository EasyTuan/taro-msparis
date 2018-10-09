import Taro from '@tarojs/taro';
import * as detailApi from './service';

export default {
  namespace: 'detail',
  state: {
    goodsId: '',
    detail: {},
    imageObj: [],
    goodsdata: [],
    cartAmount: '',
    currentChooseId: '',
    isjoin: false,
    specificationsList: [],
    showModal: false,
    closeModalType: 0,
    modalContent: '',
  },

  effects: {
    * getGoodsInfo({ payload }, { call, put, select }) {
      const res = yield call(detailApi.getProductInfo, {
        id: payload.goodsId
      });
      if (res.status == 'ok') {
        if (res.data.measurement != null) {
          res.data.measurement = String(res.data.measurement).split('\n');
        } else {
          res.data.measurement = [];
        }
        if (res.data.comments.rows) {
          Array.from(res.data.comments.rows).forEach((item) => {
            switch (item.fit_score) {
              case 1:
                item.fit_text = '尺码偏小';
                break;
              case 2:
                item.fit_text = '尺码正好';
                break;
              case 3:
                item.fit_text = '尺码偏大';
                break;
              default:
                break;
            }
            item.satisfied_score = new Array(item.satisfied_score);
          });
        }
        let imgList;
        if (res.data.image){
          imgList = res.data.image.map((item) => {
            return {
              image_src: item,
            };
          });
        } else {
          imgList = [{
            image_src: "http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png",
          }];
        }
        Taro.setNavigationBarTitle({
          title: res.data.name
        })
        yield put({
          type: 'save',
          payload: {
            payload,
            detail: res.data,
            imageObj: imgList,
            specificationsList: res.data.specifications,
          },
        });
      }
    },
    * getRecommend({ payload }, { call, put, select }) {
      const goodsId = yield select(state => state.detail.goodsId);
      const resp = yield call(detailApi.recommendYou, {
        id: payload.id || goodsId,
        page_size: 20,
      });
      if (resp.status == 'ok') {
        yield put({
          type: 'save',
          payload: {
            goodsdata: resp.data.rows,
          },
        });
      }
    },
    * getStock(_, { call, put, select }) {
      const { goodsId, currentChooseId } = yield select(state => state.detail);
      const region_code = yield select(state => state.home.district_code);
      const res = yield call(detailApi.checkStock, {
        product_id: goodsId,
        specification_key: currentChooseId,
        delivery_region: region_code,
      });
      // 衣袋已满
      if (res.data && res.data.is_full) {
        yield put({
          type: 'save',
          payload: {
            isjoin: false,
            showModal: true,
            closeModalType: 1,
            modalContent: '衣袋已放满美衣，是否现在去结算？',
          },
        });
        return;
      }
      // 免费格子满
      const detail = yield select(state => state.detail.detail);
      if (res.data && res.data.is_pay_grid) {
        let dots_price,
          dots_origin_price;
        if (detail.dots > res.data.can_use_dots && res.data.can_use_dots > 0) {
          dots_price = res.data.dots_price / 100 * (detail.dots - res.data.can_use_dots);
          dots_origin_price = res.data.dots_origin_price / 100 * (detail.dots - res.data.can_use_dots);
        } else {
          dots_price = res.data.dots_price / 100 * detail.dots;
          dots_origin_price = res.data.dots_origin_price / 100 * detail.dots;
        }
        yield put({
          type: 'save',
          payload: {
            isjoin: false,
            showModal: true,
            closeModalType: 2,
            modalContent: `当前衣袋免费美衣件数已用完，现在付费即可增加美衣件数 \r\n此件¥${dots_price} 原价¥${dots_origin_price}`,
          },
        });
        return;
      }
      yield put({
        type: 'joinCart',
      });
    },
    * joinCart(_, { call, put, select }) {
      const { goodsId, currentChooseId } = yield select(state => state.detail);
      const { region_code } = yield select(state => state.common.defaultUserAddress);
      const r = yield call(detailApi.joinCart, {
        product_id: goodsId,
        specification_key: currentChooseId,
        source: 1,
        // 全局的地址定位code需要传过来 wepy.$instance.globalData.defaultUserAddress.region_code
        delivery_region: region_code,
      });
      yield put({
        type: 'save',
        payload: {
          isjoin: false,
          currentChooseId: '',
          showModal: false,
        },
      });
      if (r.status == 'ok') {
        yield put({
          type: 'getAmount',
        });
        // wepy.$instance.globalData.isGetAmount = true;
        Toast.success('加入衣袋成功');
      } else if (r.error.code == 17003 || r.error.code == 17004) {
        // 无卡
        yield put({
          type: 'save',
          payload: {
            showModal: true,
            closeModalType: 3,
            modalContent: '开通会员卡租衣，每次最多任选5件美衣，免洗包邮',
          },
        });
      } else if (r.error.code == 18017) {
        yield put({
          type: 'save',
          payload: {
            showModal: true,
            closeModalType: 3,
            modalContent: '当前为vip美衣，请先升级或成为vip会员再试',
          },
        });
      }
    },
    * getAmount(_, { call, put }) {
      const r = yield call(detailApi.getClothesAmount, {});
      if (r.status == 'ok') {
        const cartAmount = r.data.package_long_rent_amount;
        Tool.storage.setItem('cartAmount', cartAmount);
        // wepy.$instance.globalData.isGetAmount = false;
        yield put({
          type: 'save',
          payload: {
            cartAmount,
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
