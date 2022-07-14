const path = require('path');
// const VueLoader = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: resolve('src/main.ts'),
    vendor: ['vue', 'axios'],
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': resolve('src'),
    },
  },
  devServer: {
    static: {
      directory: resolve('dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: {
      index: path.resolve(__dirname, 'index.html'),
      //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
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
        include: resolve('node_modules/element-plus'),
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
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
      template: resolve('public/index.html'),
      chunks: ['index'],
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
};
