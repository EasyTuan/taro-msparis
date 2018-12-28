import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount = () => {};

  render() {
    return (
      <View className="about-page">
        <View>
          Taro 是一套遵循 React 语法规范的 多端开发
          解决方案。现如今市面上端的形态多种多样，Web、React-Native、微信小程序等各种端大行其道，当业务要求同时在不同的端都要求有所表现的时候，针对不同的端去编写多套代码的成本显然非常高，这时候只编写一套代码就能够适配到多端的能力就显得极为需要。
        </View>
        <View>
          使用 Taro，我们可以只书写一套代码，再通过 Taro
          的编译工具，将源代码分别编译出可以在不同端（微信小程序、H5、React-Native
          等）运行的代码。
        </View>
        <View>
          该项目基于Taro，构建了一个时装衣橱的项目演示，涉及了一个电商平台完整的业务逻辑和功能点，如果这个项目能驾驭的了，相信大部分公司的其他React项目也就不在话下。
        </View>
        <View>
          项目GitHub地址：https://github.com/EasyTuan/taro-msparis
          如遇网络不佳，请移步国内镜像加速节点：https://gitee.com/easytuan/taro-msparis
        </View>
      </View>
    );
  }
}
