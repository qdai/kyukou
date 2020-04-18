'use strict';

const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const env = require('./env');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require
const { GenerateSW } = require('workbox-webpack-plugin'); // eslint-disable-line node/no-unpublished-require

const dest = path.join(__dirname, 'public');
const src = path.join(__dirname, 'src');

module.exports = {
  entry: { app: path.join(src, 'App.jsx') },
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
    path: dest,
    publicPath: '/'
  },
  plugins: [new webpack.DefinePlugin({ SITE: JSON.stringify(env.SITE) }), new GenerateSW()],
  resolve: { extensions: ['.js', '.jsx'] }
};
