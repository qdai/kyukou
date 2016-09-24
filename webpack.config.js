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
    admin: path.join(src, 'js/admin.jsx'),
    app: path.join(src, 'js/app.jsx'),
    calendar: path.join(src, 'js/calendar.jsx'),
    status: path.join(src, 'js/status.jsx')
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.(js|jsx)$/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(dest, 'js')
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(`v${version.slice(0, version.indexOf('.'))}`),
      SITE_URL: JSON.stringify(siteUrl),
      // eslint-disable-next-line no-process-env
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: saveLicense }
    })
  ]
};
