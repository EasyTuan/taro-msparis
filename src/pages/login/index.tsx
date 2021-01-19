import React from 'react'
import Taro from '@tarojs/taro'
import { View, Form, Input, Button } from '@tarojs/components'

import './index.scss'

const Login: Taro.FC = () => {
  return (
    <View className="index">
      <View className="title">
        <View>您好，请登录</View>
        <View>新会员注册即享18天会员98元</View>
      </View>
      <Form className="form">
        <Input
          className="input"
          placeholder="请输入手机号"
          type="number"
          maxlength={11}
          placeholderStyle="color:#5e5b5b"
        />
        <View className="codeInput">
          <Input
            className="input"
            placeholder="请输入验证码"
            type="number"
            maxlength={6}
            placeholderStyle="color:#5e5b5b"
          />
          <View className="hint">获取验证码</View>
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
