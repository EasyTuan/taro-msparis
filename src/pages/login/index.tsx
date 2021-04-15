import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Form, Input, Button } from '@tarojs/components'
import { login, getSms } from '../../actions/login_action'
import './index.scss'

const Login: Taro.FC = () => {
  const formSubmit = (e) => {
    if (
      phoneNumber == '' ||
      phoneNumber.length != 11 ||
      code == '' ||
      code.length != 4
    ) {
      Taro.showToast({
        title: '请输入有效的手机号和正确的验证码',
        icon: 'none',
      })
    }
    login(e.detail.value)
  }
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  return (
    <View className="index">
      <View className="title">
        <View>您好，请登录</View>
        <View>新会员注册即享18天会员98元</View>
      </View>
      <Form className="form" onSubmit={formSubmit}>
        <Input
          name="mobile"
          className="input"
          placeholder="请输入手机号"
          type="number"
          maxlength={11}
          placeholderStyle="color:#5e5b5b"
          value={phoneNumber}
          onInput={(e) => {
            setPhoneNumber(e.detail.value)
          }}
        />
        <View className="codeInput">
          <Input
            name="code"
            className="input"
            placeholder="请输入验证码"
            type="number"
            maxlength={4}
            placeholderStyle="color:#5e5b5b"
            value={code}
            onInput={(e) => {
              setCode(e.detail.value)
            }}
          />
          <View
            className="hint"
            onClick={() => {
              console.log('1')
              if (phoneNumber == '' || phoneNumber.length != 11) {
                Taro.showToast({
                  title: '请输入有效的手机号',
                  icon: 'none',
                })
              }
              getSms({ mobile: phoneNumber })
            }}
          >
            获取验证码
          </View>
        </View>
        <Button className="loginButton" size="mini" formType="submit">
          登录
        </Button>
        <View>收不到短信？使用语音验证码</View>
      </Form>
    </View>
  )
}
export default Login
