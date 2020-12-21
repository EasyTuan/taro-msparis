/**
 * pages模版快速生成脚本
 **/

import FS from 'fs'

const dirName = process.argv[2] //path

if (!dirName) {
  console.log('文件夹名称不能为空')
  console.log('示例:npm run temp test')
  process.exit(0)
}

// 页面模版
const indexTemp = `import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

const ${titleCase(dirName)}: Taro.FC = () => {
  return (
    <View className="index">
      <View>Hello World</View>
    </View>
  )
}
export default ${titleCase(dirName)}

`;

// scss文件模版
const scssTemp = `@import '../../base.scss';

.index {
  height:100%;
  @include flex-column;
}
`;

//config 模板
const configTemp = `export default {
    navigationBarTitleText: '首页'
  }
  `

  
FS.mkdirSync(`./src/pages/${dirName}`)
process.chdir(`./src/pages/${dirName}`)

FS.writeFileSync('index.tsx', indexTemp)
FS.writeFileSync('index.scss', scssTemp)
FS.writeFileSync('index.config.ts', configTemp)

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string
}

process.exit(0)