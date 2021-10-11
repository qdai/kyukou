'use strict';

const CopyPlugin = require('copy-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const env = require('./env');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require
const { GenerateSW } = require('workbox-webpack-plugin'); // eslint-disable-line node/no-unpublished-require

const dest = path.resolve(__dirname, 'public');
const src = path.resolve(__dirname, 'src');

const config = {
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
  optimization: { minimizer: [new TerserPlugin({ exclude: /^lib\/redoc\.standalone\..*/u })] },
  output: {
    path: dest,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({ SITE: JSON.stringify(env.SITE) }),
    new GenerateSW(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/static/**/*',
          to: '[name][ext]'
        },
        {
          from: 'node_modules/redoc/bundles/redoc.standalone.*',
          to: 'lib/[name][ext]'
        }
      ]
    })
  ],
  resolve: { extensions: ['.js', '.jsx'] }
};

module.exports = config;
