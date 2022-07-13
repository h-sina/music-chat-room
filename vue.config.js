// const AutoImport = require('unplugin-auto-import/webpack');
// const Components = require('unplugin-vue-components/webpack');
// const {ElementPlusResolver} = require('unplugin-vue-components/resolvers');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       AutoImport({
//         resolvers: [ElementPlusResolver()],
//       }),
//       Components({
//         resolvers: [ElementPlusResolver()],
//       }),
//     ],
//   },
// };
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: './public/img/favicon.ico',
      favicon16: './public/img/favicon.ico',
      appleTouchTcom: './public/img/favicon.ico',
      maskIcon: './public/img/favicon.ico',
      msTileImage: './public/img/favicon.ico',
    },
  },
};
