const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  lintOnSave: false,
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
    proxy: {
      '/system': {
        target: 'http://dev.operation.lekebaba.cn',
        we:true,
        changeOrigin: true,  //配置跨域
        pathRewrite: {
          '^/system': ''
        }
      }
    }
  },
 
}
