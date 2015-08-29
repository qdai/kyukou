'use strict';

const apidoc = require('apidoc');
const config = require('config');

const createDoc = function (src) {
  const doc = apidoc.createDoc({
    debug: false,
    parse: true,
    silent: true,
    src
  });
  doc.data = JSON.parse(doc.data);
  doc.project = JSON.parse(doc.project);
  doc.list = {};
  doc.data.forEach(function (el) {
    if (!doc.list[el.group]) {
      doc.list[el.group] = [];
    }
    doc.list[el.group].push(el.title);
  });
  return doc;
};
const dest = './public';
const src = './src';

exports.bower = {
  dest: src + '/static/lib'
};

exports.build = {
  css: {
    dest: dest + '/css',
    src: src + '/less/**/*.less'
  },
  html: {
    dest: './views',
    options: {
      locals: {
        doc: createDoc('./routes/api'),
        site: config.get('site')
      }
    },
    src: [src + '/jade/**/*.jade', '!' + src + '/jade/includes/**']
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
  src: [dest, src + '/static/lib', './views']
};

exports.lint = {
  js: {
    src: ['./**/*.js', '!./node_modules/**', '!./bower_components/**', '!./public/**', '!./src/static/**']
  }
};