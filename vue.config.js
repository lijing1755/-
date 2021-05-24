const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  // 放置静态资源的目录
  assetsDir: 'static',
  // html 的输出路径
  indexPath: 'index.html',
  // 文件名哈希
  filenameHashing: true,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。

  lintOnSave: false,

  // 是否使用带有浏览器内编译器的完整构建版本

  runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。

  transpileDependencies: [],

  // 是否为生产环境构建生成 source map？

  productionSourceMap: true,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。

  crossorigin: '',

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。

  integrity: false,
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    // const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // svgRule.uses.clear()

    // // 添加要替换的 loader
    // svgRule
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   }),
    //   {
    //     test: /\.(svg)(\?.*)?$/,
    //     use: [
    //       {
    //         loader: 'svg-sprite-loader',
    //         include: [resolve('src/icons')],
    //         options: {
    //           symbolId: 'icon-[name]'
    //         }
    //       }
    //     ]
    //   }
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8117,
    https: false,
    hotOnly: false,
    inline: true,
    proxy: {
      '/operationApi': {
        target: 'http://dev.operation.lekebaba.cn',
        // we: true,
        changeOrigin: true, // 配置跨域
        pathRewrite: {
          '^/operationApi': ''
        }
      }
    }
  }

}
