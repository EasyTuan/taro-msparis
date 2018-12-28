import Taro, { Component } from '@tarojs/taro';
import { View, Input, Image, Text, Picker } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({ addressUpdate }) => ({
  ...addressUpdate,
}))
class Addressupdate extends Component {
  config = {
    navigationBarTitleText: '',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'addressUpdate/getDistricts',
      payload: {
        send_cities: 0,
      },
    });
  };

  // picker选择数据动态渲染
  onColumnchange = e => {
    const { column, value } = e.detail;
    const { cities, districts } = this.props;
    const arr = JSON.parse(JSON.stringify(districts));
    if (column == 0) {
      arr[1] = [];
      arr[2] = [];
      cities[value].cities.forEach(item => {
        arr[1].push({
          key: item.key,
          name: item.name,
        });
      });
      cities[value].cities[0].regions.forEach(item => {
        arr[2].push({
          key: item.key,
          name: item.name,
        });
      });
    }
    if (column == 1) {
      arr[2] = [];
      cities[value].cities[0].regions.forEach(item => {
        arr[2].push({
          key: item.key,
          name: item.name,
        });
      });
    }
    this.props.dispatch({
      type: 'addressUpdate/save',
      payload: {
        districts: arr,
      },
    });
  };

  // picker赋值
  onChange = e => {
    const { value } = e.detail;
    const { cities } = this.props;
    const detail = cities[value[0]].cities[value[1]].regions[value[2]];
    this.props.dispatch({
      type: 'addressUpdate/save',
      payload: {
        pickerValue: value,
        showValue: {
          region_code: detail.key,
          region_name: detail.fullname,
        },
      },
    });
  };

  update = event => {
    const { value, id } = event.target;
    this.props.dispatch({
      type: 'addressUpdate/save',
      payload: { [id]: value },
    });
  };

  // 保存提交
  submit = () => {
    const {
      showValue,
      contact_name,
      contact_mobile,
      address_detail,
    } = this.props;
    if (contact_name === '') {
      Taro.showToast({
        title: '请输入收货人',
        icon: 'none',
      });
      return;
    }
    if (!/^1[234578]\d{9}$/.test(contact_mobile)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      });
      return;
    }
    if (showValue.region_name === '') {
      Taro.showToast({
        title: '请选择收货地址',
        icon: 'none',
      });
      return;
    }
    if (address_detail === '') {
      Taro.showToast({
        title: '请输入详细地址',
        icon: 'none',
      });
      return;
    }
    this.props.dispatch({
      type: 'addressUpdate/submit',
      payload: {
        showValue,
        contact_name,
        contact_mobile,
        address_detail,
      },
    });
  };

  // 删除地址
  delete = () => {
    Taro.showModal({
      content: '是否删除该地址？',
    }).then(res => {
      if (res.confirm) {
        this.props.dispatch({
          type: 'addressUpdate/removeAddress',
        });
      }
    });
  };

  render() {
    const {
      addressId,
      districts,
      pickerValue,
      showValue,
      contact_name,
      contact_mobile,
      address_detail,
    } = this.props;
    return (
      <View className="addressUpdate-page">
        <View className="head">
          {addressId && addressId !== '' ? '编辑地址' : '添加地址'}
        </View>
        <View className="form">
          <Input
            placeholder="收件人"
            id="contact_name"
            value={contact_name}
            onInput={this.update}
          />
          <Input
            type="number"
            maxLength="11"
            placeholder="手机号码"
            id="contact_mobile"
            value={contact_mobile}
            onInput={this.update}
          />
          <Picker
            className="picker"
            mode="multiSelector"
            rangeKey="name"
            range={districts}
            onColumnchange={this.onColumnchange}
            onChange={this.onChange}
            value={pickerValue}
          >
            {showValue.region_name == '' ? (
              <View className="label">
                省、市、区
                <View className="iconfont icon-more arrow" />
              </View>
            ) : (
              <View className="picker-item">
                {showValue.region_name}
                <View className="iconfont icon-more arrow" />
              </View>
            )}
          </Picker>
          <Input
            placeholder="详细地址"
            id="address_detail"
            value={address_detail}
            onInput={this.update}
          />
        </View>
        <View className="bottom-btn">
          {addressId && addressId !== '' && (
            <View className="confirm remove" onClick={this.delete}>
              <Image
                mode="widthFix"
                src={require('../../images/icon/times.png')}
              />
              <Text>删除</Text>
            </View>
          )}
          <View className="confirm" onClick={this.submit}>
            <Image
              mode="widthFix"
              src={require('../../images/icon/check.png')}
            />
            <Text>保存</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Addressupdate;
