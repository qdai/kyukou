'use strict';

const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const env = require('./env');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require
const { GenerateSW } = require('workbox-webpack-plugin'); // eslint-disable-line node/no-unpublished-require

const dest = path.resolve(__dirname, 'public');
const src = path.resolve(__dirname, 'src');

module.exports = {
  entry: { app: ['./node_modules/core-js/es/object/entries.js', path.resolve(src, 'app.jsx')] },
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: [
          src,
          path.resolve(__dirname, 'node_modules/nano-css'),
          path.resolve(__dirname, 'node_modules/react-query')
        ]
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
