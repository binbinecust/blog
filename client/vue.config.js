const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  'js-cookie': 'Cookies',
  'vue-quill-editor': 'VueQuillEditor'
};

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.quilljs.com/1.3.6/quill.core.css',
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      'https://cdn.quilljs.com/1.3.6/quill.bubble.css'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.quilljs.com/1.3.6/quill.core.css',
      'https://cdn.quilljs.com/1.3.6/quill.snow.css',
      'https://cdn.quilljs.com/1.3.6/quill.bubble.css'
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://www.bibidaodao.cn/assets/script/quill.min.js'
    ]
  }
};

module.exports = {
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
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        console.log('production');
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev;
        console.log('development');
      }
      return args;
    });
  },
  configureWebpack: config => {
    config.entry.app = './src/main.ts';
    config.resolve.extensions = ['.js', '.vue', '.json', '.ts'];
    if (process.env.NODE_ENV === 'production') {
      config.externals = externals;
      config.plugins = config.plugins.concat([
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        }),
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      ]);
    }
    if (process.env.NODE_ENV === 'development') {
      config.devServer = {
        disableHostCheck: true
      };
    }
  }
};
