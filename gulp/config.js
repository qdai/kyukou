'use strict';

const apidoc = require('apidoc');
const config = require('config');
const hljs = require('highlight.js');

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
  doc.data.map(function (api) {
    // list
    if (!doc.list[api.group]) {
      doc.list[api.group] = [];
    }
    doc.list[api.group].push(api.title);
    // examples
    api.success.examples = api.success.examples.map(function (example) {
      example.content = hljs.highlight(example.type, example.content, true).value;
      return example;
    });
    return api;
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
