// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];
module.exports = {
  transpileDependencies: [/\bvue-awesome\b/],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 * 1024 }));
    config.module
      .rule('typescriptrule')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => ({ appendTsSuffixTo: [/\.vue$/] }));
  },
  configureWebpack: config => {
    config.entry.app = './src/main.ts';
    config.resolve.extensions = ['.js', '.vue', '.json', '.ts'];
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins = config.plugins.concat([
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         warnings: false,
    //         compress: {
    //           drop_debugger: true,
    //           drop_console: true
    //         }
    //       },
    //       sourceMap: false,
    //       parallel: true
    //     }),
    //     new CompressionWebpackPlugin({
    //       algorithm: 'gzip',
    //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //       threshold: 10240,
    //       minRatio: 0.8
    //     })
    //   ]);
    // }
  }
};
