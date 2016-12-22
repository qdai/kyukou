'use strict';

const config = require('config');
const jsonfile = require('jsonfile');
const path = require('path');
const saveLicense = require('uglify-save-license');
const webpack = require('webpack');

const dest = path.join(__dirname, 'public');
const siteUrl = config.get('site.url');
const src = path.join(__dirname, 'src');
const { version } = jsonfile.readFileSync(path.join(__dirname, './package.json'));

module.exports = {
  entry: {
    'js/admin': ['babel-polyfill', path.join(src, 'js/admin.jsx')],
    'js/app': ['babel-polyfill', path.join(src, 'js/app.jsx')],
    'js/calendar': ['babel-polyfill', path.join(src, 'js/calendar.jsx')],
    'js/status': ['babel-polyfill', path.join(src, 'js/status.jsx')],
    'service-worker': path.join(src, 'js/service-worker.js')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx)$/
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: dest
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(version),
      SITE_URL: JSON.stringify(siteUrl)
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['js/admin', 'js/app', 'js/calendar', 'js/status'],
      filename: 'js/commons.js',
      name: 'js/commons'
    }),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: saveLicense } })
  ]
};
