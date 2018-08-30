'use strict';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line node/no-unpublished-require
const config = require('config');
const jsonfile = require('jsonfile');
const path = require('path');
const saveLicense = require('uglify-save-license'); // eslint-disable-line node/no-unpublished-require
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require

const dest = path.join(__dirname, 'public');
const siteUrl = config.get('site.url');
const src = path.join(__dirname, 'src');
const { version } = jsonfile.readFileSync(path.join(__dirname, './package.json'));

module.exports = {
  entry: {
    'js/admin': ['@babel/polyfill', path.join(src, 'js/admin.jsx')],
    'js/app': ['@babel/polyfill', path.join(src, 'js/app.jsx')],
    'js/calendar': ['@babel/polyfill', path.join(src, 'js/calendar.jsx')],
    'js/status': ['@babel/polyfill', path.join(src, 'js/status.jsx')],
    'service-worker': path.join(src, 'js/service-worker.js')
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx)$/
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({ uglifyOptions: { output: { comments: saveLicense } } })],
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
      SITE_URL: JSON.stringify(siteUrl)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
