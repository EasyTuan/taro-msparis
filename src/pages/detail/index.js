import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import * as detailApi from './service';
import MySwiper from '../../components/MySwiper';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({cart}) => ({
  ...cart,
}))
export default class Detail extends Component {
  config = {
    navigationBarTitleText: '',
  };

  constructor() {
    super(...arguments);
    this.state = {
      goodsId: '',
      detail: {},
      imageObj: [],
      goodsdata: [],
      cartAmount: '',
      currentChooseId: '',
      currentChooseName: '',
      specificationsList: [],
      showModal: false,
      closeModalType: 0,
      modalContent: '',
    }
  }

  componentDidMount = () => {
    this.setState({
      goodsId: this.$router.params.id,
    })
    this.getGoodsInfo(this.$router.params.id);
  };

  async getGoodsInfo(goodsId) {
    const res = await detailApi.getProductInfo({
      id: goodsId
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
      this.setState({
        detail: res.data,
        imageObj: imgList,
        specificationsList: res.data.specifications,
      })
    }
  }


  openSize() {
    Taro.navigateTo({
      url: '/pages/size/index',
    })
  }

  //加入衣袋
  join = async () => {
    if (!Taro.getStorageSync('access_token')) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
      return;
    }
    if (this.state.detail.mode_id == 3 && (this.state.detail.enabled != 1 || this.state.detail.sale_stock == 0)) {
      Taro.showToast({
        title: '商品已售罄',
        icon: 'none',
      });
      return;
    }
    if (this.state.currentChooseId === '') {
      Taro.showToast({
        title: '请选择尺码',
        icon: 'none',
      });
      return;
    }
    if (this.state.detail.enabled == 1) {
      const { detail, currentChooseId, currentChooseName } = this.state;
      for (let item of this.props.items) {
        if (item.product_id == detail.product_master_id) {
          Taro.showToast({
            title: '衣袋已存在该美衣~~',
            icon: 'none',
          });
          return;
        }
      }
      this.props.dispatch({
        type: 'cart/save',
        payload: {
          items: [...this.props.items, {
            brand: detail.brand,
            images: detail.image[0],
            name: detail.name,
            product_id: detail.product_master_id,
            product_price: detail.market_price,
            specification: currentChooseName,
            spu: currentChooseId,
            type: detail.type_id,
          }]
        },
      })
      Taro.showToast({
        title: '加入衣袋成功',
      });
    }
  }

  chooseSize = (e) => {
    const { has_stock, id, name } = e.currentTarget.dataset;
    // 只有has_stock =1 才可以选择尺码,其他都是disable
    if (has_stock == 1) {
      // 如果点击当前，则2次点击清空
      if (id == this.state.currentChooseId) {
        this.setState({
          currentChooseId: '',
          currentChooseName: ''
        })
      } else {
        console.log(name);
        // 首次点击，赋值为当前id
        this.setState({
          currentChooseId: id,
          currentChooseName: name
        })
      }
    }
  }

  shouldShowClothesDetail = () => {
    const detail = this.state.detail;
    return (detail.measurement && detail.measurement.length > 0) || (detail.size_suggestion && detail.size_suggestion != null) || (detail.fabric && detail.fabric != null);
  }

  goToPage = (e) => {
    if (typeof window !== 'undefined') {
      Taro.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }else {
      Taro.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }

  makePhoneCall() {
    if (typeof window !== 'undefined') {
      window.location.href = "tel:123456";
    }else {
      Taro.makePhoneCall({
        phoneNumber: '123456'
      })
    }
  }

  computedStyle = (item) => {
    let str = '';
    if (item.id == this.state.currentChooseId) {
      str = 'size on';
    } else {
      str = 'size';
    }
    if (item.has_stock != 1) {
      str = 'size off';
    }
    return str;
  }

  render() {
    const { imageObj, detail, currentChooseId, specificationsList } = this.state;
    const { items } = this.props;
    return (
      <View className="detail-page">
        <View className="image-box-wrap">
          <View className="image-box clearfix">
            <MySwiper banner={imageObj} />
            <View className="share-btn">
              <Button open-type="share" />
            </View>
          </View>
          { detail.mode_id && detail.mode_id == 3 && (detail.enabled != 1 || detail.sale_stock == 0) && (
            <View className="sold-out">
              <View className="sales-end">已售罄</View>
            </View>
          )}

          {detail.enabled && detail.enabled != 0 && detail.enabled != 1 && detail.enabled != 2 && (
            <View className="unable">
              <View className="sales-end">下架</View>
            </View>
          )}
        </View>
        <View className="container">
          { /* -- 商品信息 -- */ }
          <View className="info-business-card">
            <View className="name">
              {detail.brand}
            </View>
            {
              (detail.market_price / 100 > 500) && (
                <View className="model">
                  参考价 ¥
                  {detail.market_price / 100}
                </View>
              )}
          </View>
          <View className="product_name">
            { detail.type_id == 2 && detail.mode_id == 1 && <View>VIP</View> }
            { detail.limit_tag && detail.limit_tag != '' && <View className="zan-capsule__center">{detail.limit_tag}</View>}
            {detail.name}
          </View>
          <View className="code">
            {detail.product_spu}
          </View>
          <View className="info-size">
            { specificationsList && specificationsList.length > 0 && specificationsList.map((spe, speIndex) => {
              console.log(spe);
              return (
                <View key={speIndex}>
                  { spe && spe.options && spe.options.map((item, index) => (
                    <View key={index}>
                      { spe.name == '中码' ? (
                        <View className={this.computedStyle(item)} data-has_stock={item.has_stock} data-id={item.id} data-name={item.name} onClick={this.chooseSize}>
                          { item.name == '均码' ? <View>均码</View> : (
                            <View>
                              {`${spe.name}${item.value}号`}
                            </View>
                          )}
                        </View>) : (
                          <View className={this.computedStyle(item)} data-has_stock={item.has_stock} data-id={item.id} onClick={this.chooseSize}>
                            <View className="double">
                              {`${spe.name}${item.name}号`}
                            </View>
                            <View className="double font">
                              {`中码${item.value}号`}
                            </View>
                          </View>)
                      }
                    </View>
                  ))}
                </View>
              );
            })}
          </View>

          <View className="proudct-size-line" onClick={this.openSize}>
            <View className="clearfix">
              <View className="icon-tag" />
              <View className="text">各国尺码转换表</View>
            </View>
          </View>
          {/* 买手点评 */}
          <View>
            { detail.designer_comment && detail.designer_comment != null && (
            <View className="goods-info">
              <View className="chapter-head">买手点评</View>
              <View className="fj">
                <Image className="fj-img" src={detail.buyer_Info.avatar} alt="" />
                <View>
                  <View className="fj-name">{detail.buyer_Info.nickname}</View>
                  <View className="fj-tag">女神派时尚买手</View>
                  <View className="fj-info">{detail.designer_comment}</View>
                </View>
              </View>
            </View>)}
          </View>
          { /* 美衣详情  */}
          { this.shouldShowClothesDetail() && (
            <View className="goods-info">
              <View className="chapter-head">美衣详情</View>
              { detail.measurement != '' && (
                <View className="detail-info">
                  <View className="head">
                    <Image src={require('../../images/icon/icon32.png')} alt="" />
                    平铺测量
                  </View>
                  {
                    detail.measurement && detail.measurement.map((item, index) => (
                      <View className="block" key={index}>{item}</View>
                    ))
                  }
                </View>)
              }
              { detail.size_suggestion && detail.size_suggestion != null && (
                <View className="detail-info">
                  <View className="head">
                    <Image alt="" src={require('../../images/icon/icon33.png')} />
                    尺码建议
                  </View>
                  <View>{detail.size_suggestion}</View>
                </View>)
              }
              { detail.fabric && detail.fabric != null && (
                <View className="detail-info">
                  <View className="head">
                    <Image alt="" src={require('../../images/icon/icon34.png')} />
                    面料成分
                  </View>
                  { detail.thickness != null && (
                    <View>
                      面料：
                      {detail.fabric}
                      (
                      {detail.thickness}
                      )
                    </View>)}
                  { detail.thickness == null && (
                    <View>
                      面料：
                      {detail.fabric}
                    </View>
                  )}
                </View>)
              }
            </View>
          )}
          { /* 优质评价 */ }
          <View className="goods-info">
            <View className="chapter-head">
              优质评价（
              { detail.comments && detail.comments.total}
              ）
            </View>
            { detail.comments && detail.comments.total == 0 && <View className="text-center">———— 暂无优质评价 ————</View>}
            { detail.comments && detail.comments.rows && detail.comments.rows.map((item, index) => (
              <View className="fj" key={index}>
                <Image className="fj-img" alt="" src={item.user_pic} />
                <View>
                  <View className="fj-name font26">{item.nickname}</View>
                  <View className="fj-tag">
                    {/* <Commentbar progress={item.satisfied_score} /> */}
                    {item.fit_text}
                  </View>
                  <View className="fj-info">{item.comment}</View>
                  <View className="comment-img">
                    {
                      item.images && item.images.map((sub1, subIndex1) => (
                        <Image key={subIndex1} className="goods-img" mode="widthFix" src={sub1.image_url} />
                      ))
                    }
                  </View>
                </View>
              </View>
            ))
            }
          </View>
          { /* 品牌介绍 */}
          {detail.brand && detail.brand != null && (
            <View className="goods-info">
              <View className="chapter-head">品牌介绍</View>
              <View className="introduce">
                <View className="b">{detail.brand}</View>
                { /*  <image src="{{detail.brand_logo}}"  alt="" /> */}
                <View className="iconfont icon-more" />
              </View>
              {detail.brand_desc != null && (
                <View className="light">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {detail.brand_desc}
                </View>
              )}
            </View>
          )}
          { /* 服务说明 */ }
          <View className="goods-info">
            <View className="chapter-head">
              服务说明
              { /* <image className="icon"  alt="" src="../../images/icons/icon35.png" /> */ }
            </View>
            <View className="server-ul">
              <View className="server-list">
                <Image mode="widthFix" src="http://static-r.msparis.com/uploads/d/6/d646e479e328e9f370462b51fb841e70.png" alt="" />
                <View>每次4件</View>
                <View>无限换穿</View>
              </View>
              <View className="server-list">
                <Image mode="widthFix" src="http://static-r.msparis.com/uploads/1/3/137d9963d13a053a6a81784af1256aa9.png" alt="" />
                <View>五星洗护</View>
                <View>往返包邮</View>
              </View>
              <View className="server-list">
                <Image mode="widthFix" src="http://static-r.msparis.com/uploads/c/0/c0367921e38cc7fd33f63897b18a86ef.png" alt="" />
                <View>APP一键还衣</View>
                <View>快递上门</View>
              </View>
            </View>
          </View>
        </View>
        { /* 底部操作栏 */ }
        <View className="detail-bottom-btns">
          <Button className="nav" data-url="/pages/home/index" onClick={this.goToPage}>
            <Image className="nav-img" src={require('../../images/tab/home.png')} alt="" />
            首页
          </Button>
          <Button className="nav" onClick={this.makePhoneCall}>
            <Image className="nav-img" src={require('../../images/icon/customerservice.png')} alt="" />
            客服
          </Button>
          <Button className="nav" data-url="/pages/cart/index" onClick={this.goToPage}>
            <Image className="nav-img" src={require('../../images/tab/cart.png')} alt="" />
            衣袋
            { items.length > 0 && <View className="zan-badge__count">{items.length}</View> }
          </Button>
          <View className={currentChooseId == '' ? 'join join-disabled' : 'join'} onClick={this.join}>加入衣袋</View>
        </View>
      </View>
    );
  }
}
