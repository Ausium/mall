const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}

// module.exports = {
//   plugins: {
//     autoprefixer: {
//       "postcss-px-to-viewport": {
//         viewportWidth: 375,   //视窗的宽度，对应的是我们设计稿的宽度
//         viewportHeight: 667,  //视窗的高度，对应的是我们设计稿的高度 
//         unitPrecison: 5,      //指定'px'转换为视窗单位值的小数位数（因为很多时候是无法消除的）
//         viewportUnit: 'vw',   //指定需要转换成的视窗单位，建议使用vw
//         // selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
//         minPixelValue: 1,   //小于或者等于'1px'不转换为视窗单位
//         mediaQuery: false,  //是否允许媒体查询中转换'px'
//         // exclude: [/TabBar/] // exclude中存放的元素必须是正则表达式
//       }
//     }
//   }
// }

