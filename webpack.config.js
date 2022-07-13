const path = require('path');
// const VueLoader = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
module.exports = {
  mode: 'production',
  // devtool: "source-map",
  entry: {
    index: path.resolve(__dirname, './src/main.ts'),
    vendor: ['vue', 'axios'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: true,
    // minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    // splitChunks: {
    //   chunks: 'all',
    // },
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              webp: {
                lossless: 1,
              },
            },
          },
        },
      }),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [resolve('src')],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(t|j|mj)s$/,
        include: path.resolve(__dirname, './node_modules/element-plus'),
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.js$/,
      //   include: path.resolve('src'),
      //   use: [
      //     {
      //       loader: 'thread-loader',
      //       options: {
      //         // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
      //         // 在 require('os').cpus() 是 undefined 时回退至 1
      //         workers: 2,

      //         // 一个 worker 进程中并行执行工作的数量
      //         // 默认为 20
      //         workerParallelJobs: 50,

      //         // 额外的 node.js 参数
      //         workerNodeArgs: ['--max-old-space-size=1024'],

      //         // 允许重新生成一个僵死的 work 池
      //         // 这个过程会降低整体编译速度
      //         // 并且开发环境应该设置为 false
      //         poolRespawn: false,

      //         // 闲置时定时删除 worker 进程
      //         // 默认为 500（ms）
      //         // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
      //         poolTimeout: 2000,

      //         // 池分配给 worker 的工作数量
      //         // 默认为 200
      //         // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
      //         poolParallelJobs: 50,

      //         // 池的名称
      //         // 可以修改名称来创建其余选项都一样的池
      //         name: 'my-pool',
      //       },
      //     },
      //     // 耗时的 loader （例如 babel-loader）
      //   ],
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 4 * 1024,
        //   },
        // },
        generator: {
          filename: 'images/[name].[ext]',
        },
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
      chunks: ['index'],
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    //   chunkFilename: 'css/[name].chunk.css',
    // }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      // chunkFilename: 'css/[name].chunk.css'
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     plugins: ['imagemin-webp'],
    //   },
    // }),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     // Lossless optimization with custom option
    //     // Feel free to experiment with options for better result for you
    //     plugins: [
    //       ['gifsicle', {interlaced: true}],
    //       ['jpegtran', {progressive: true}],
    //       ['optipng', {optimizationLevel: 5}],
    //     ],
    //   },
    // }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // new CompressionPlugin({
    //   algorithm: 'gzip', // 使用gzip压缩
    //   test: /\.js$|\.html$|\.css$/, // 匹配文件名
    //   filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
    //   minRatio: 0.8, // 压缩率小于1才会压缩
    //   threshold: 10240, // 对超过10k的数据压缩
    //   deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
