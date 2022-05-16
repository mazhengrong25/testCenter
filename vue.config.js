// 压缩css、js
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 要压缩的文件
const productionGzipExtensions = ['js', 'css'];
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const env = process.env.NODE_ENV;

module.exports = {
  // 针对请求数进行优化
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
  },
  // console移除
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS requireModuleExtension for all css / pre-processor files.
    requireModuleExtension: false
  },
  publicPath: process.env.NODE_ENV === 'production'? './dist/': './',
  productionSourceMap: false,
  /* care*/
  devServer: {
    proxy: 'http://testcenter.ys.com',
  }
}