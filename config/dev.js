module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      host: 'localhost', // 如需局域网（如手机）访问，请更换为0.0.0.0
      // host: '0.0.0.0', // 如需局域网（如手机）访问，请更换为0.0.0.0
      port: 8088,
      https: false
    }
  }
}
