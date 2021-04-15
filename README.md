##多端适配的电子商城

> 技术栈：React + Taro + Hox + Sass + ES6/ES7+ TS

<hr />

#### 注意事项

**目前已将`taro`的版本升级到最新版本`3.0.15`,确保你本地的`taro-cli`的版本也是这个版本，可以通过`taro info`查看版本号，如果不是最新的话，可以通过执行`taro update self`(`mac`或者`linux`前面需要加上`sudo`)以及`taro update project`进行`cli`与项目依赖的更新保持一致，否则将会导致项目无法正常运行，了解更多详情可查看[Taro 环境及依赖检测](http://taro-docs.jd.com/taro/docs/GETTING-STARTED.html#%E7%8E%AF%E5%A2%83%E5%8F%8A%E4%BE%9D%E8%B5%96%E6%A3%80%E6%B5%8B)**

### 功能列表

- [x] 首页
  - [x] 滚动到底部加载
  - [x] 自定义 tabBar
- [x] 登录页
  - [x] 首页
- [x] 商品详情页
  - [x] 评论多图显示

### 目录结构

    ├── config                 // Taro配置目录
    │   ├── dev.js             // 开发时配置
    │   ├── index.js           // 默认配置
    │   └── prod.js            // 打包时配置
    ├── dist                   // 小程序编译结果目录
    ├── screenshot             // 功能截图
    ├── src                    // 源码目录
    │   ├── actions            // 异步操作
    │   ├── constants          // 常量
    │   ├── images             // 图片资源
    │   ├── models             // hox相关模块
    │   ├── pages              // 页面文件目录
    │   │   └── home
    │   │       ├── index.tsx            // 页面逻辑
    │   │       ├── index.scss           // 页面样式
    │   │       └── index.config.ts      // 页面配置
    │   ├── service            // 请求web服务
    │   ├── utils              // 通用方法
    │   ├── app.config.ts      // 入口配置文件
    │   ├── app.scss           // 入口样式文件
    │   ├── app.tsx            // 入口文件
    │   └── index.html         // 入口页面
    ├── package.json
    └── template.js            // pages模版快速生成脚本,执行命令 npm run tep `文件名`

### 功能截图

<image width='100' src="https://raw.githubusercontent.com/wussss/taro-msparis/master/src/screenshots/1.png"/> <image width='100' src="https://raw.githubusercontent.com/wussss/taro-msparis/master/src/screenshots/2.png"/> <image width='100' src="https://raw.githubusercontent.com/wussss/taro-msparis/master/src/screenshots/3.png"/> <image width='100' src="https://raw.githubusercontent.com/wussss/taro-msparis/master/src/screenshots/4.png"/>
