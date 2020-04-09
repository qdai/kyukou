'use strict';

const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const env = require('./env');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require

const dest = path.join(__dirname, 'public');
const src = path.join(__dirname, 'src');

module.exports = {
  entry: {
    'js/admin': path.join(src, 'admin.jsx'),
    'js/app': path.join(src, 'app.jsx'),
    'service-worker': path.join(src, 'service-worker.js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        loader: 'babel-loader',
        test: /\.(?:js|jsx)$/u
      }
    ]
  },
  optimization: { minimizer: [new TerserPlugin()] },
  output: {
    filename: '[name].js',
    path: dest
  },
  plugins: [new webpack.DefinePlugin({ SITE: JSON.stringify(env.SITE) })],
  resolve: { extensions: ['.js', '.jsx'] }
};
