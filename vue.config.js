module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 * 1024 }))
    config.module
      .rule('typescriptrule')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => ({ appendTsSuffixTo: [/\.vue$/] }))
  },
  configureWebpack: config => {
    config.entry.app = './src/main.ts'
    config.resolve.extensions = ['.js', '.vue', '.json', '.ts']
  }
}
