'use strict';

const config = require('config');

const dest = './public';
const src = './src';

exports.apidoc = {
  dest: 'api.json',
  src: './routes/api'
};

exports.bower = {
  dest: src + '/static/lib'
};

exports.build = {
  css: {
    dest: dest + '/css',
    src: src + '/less/**/*.less'
  },
  js: {
    dest: dest + '/js',
    options: {
      context: {
        SITE_URL: '//' + config.get('site.url')
      }
    },
    src: src + '/js/**/*.js'
  },
  static: {
    dest,
    src: src + '/static/**'
  }
};

exports.clean = {
  dest
};

exports.lint = {
  js: {
    src: ['./**/*.js', '!./node_modules/**', '!./bower_components/**', '!./public/**', '!./src/static/**']
  }
};
