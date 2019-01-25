'use strict';

const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const jsonfile = require('jsonfile');
const path = require('path');
const saveLicense = require('uglify-save-license'); // eslint-disable-line node/no-unpublished-require
const site = require('./lib/site');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require

const dest = path.join(__dirname, 'public');
const src = path.join(__dirname, 'src');
const { version } = jsonfile.readFileSync(path.join(__dirname, './package.json'));

module.exports = {
  entry: {
    'js/admin': path.join(src, 'js/admin.jsx'),
    'js/app': path.join(src, 'js/app.jsx'),
    'js/calendar': path.join(src, 'js/calendar.jsx'),
    'js/status': path.join(src, 'js/status.jsx'),
    'service-worker': path.join(src, 'js/service-worker.js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/u,
        loader: 'babel-loader',
        test: /\.(js|jsx)$/u
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { output: { comments: saveLicense } } })],
    splitChunks: {
      chunks (chunk) {
        return chunk.name !== 'service-worker';
      },
      name: 'js/commons'
    }
  },
  output: {
    filename: '[name].js',
    path: dest
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(version),
      SITE_URL: JSON.stringify(site.url)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/u, /moment$/u)
  ]
};
