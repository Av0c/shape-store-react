'use strict';

const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs')
const directory = fs.realpathSync(process.cwd())
const resolve = (relativePath) => path.resolve(directory, relativePath)

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  entry: {
    'js': [
      resolve('src/index.tsx')
    ]
  },
  resolve: {
    alias: {
      '@images': resolve('public/images'),
      '@hooks': resolve('src/hooks'),
      '@client': resolve('src/client.ts'),
      '@types': resolve('src/types'),
      '@components': resolve('src/components')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    pathinfo: true,
    path: resolve('build'),
    filename: '[name]/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            require("react-refresh/babel")
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('src/index.html'),
      chunks: ['js']
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: resolve('public'),
        to: resolve('build'),
        noErrorOnMissing: true
      }]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    contentBase: resolve('build'),
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
};
