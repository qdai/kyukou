'use strict';

const apidoc = require('apidoc');
const config = require('config');
const hljs = require('highlight.js');

const createDoc = src => {
  const doc = apidoc.createDoc({
    debug: false,
    parse: true,
    silent: true,
    src
  });
  doc.data = JSON.parse(doc.data);
  doc.project = JSON.parse(doc.project);
  doc.list = {};
  doc.data.map(api => {
    // list
    if (!doc.list[api.group]) {
      doc.list[api.group] = [];
    }
    doc.list[api.group].push(api.title);
    // examples
    api.success.examples = api.success.examples.map(example => {
      example.content = hljs.highlight(example.type, example.content, true).value;
      return example;
    });
    return api;
  });
  return doc;
};
const dest = './public';
const src = './src';

exports.build = {
  html: {
    dest: './views',
    options: {
      locals: {
        doc: createDoc('./routes/api'),
        site: config.get('site')
      }
    },
    src: [`${src}/jade/**/*.jade`, `!${src}/jade/includes/**`]
  },
  js: {
    dest: `${dest}/js`,
    files: [`${src}/js/admin.js`, `${src}/js/app.js`, `${src}/js/calendar.js`, `${src}/js/status.js`],
    options: {
      SITE_URL: `//${config.get('site.url')}`
    }
  },
  static: {
    dest,
    src: `${src}/static/**`
  }
};

exports.clean = {
  src: [dest, `${src}/css`, './views']
};

exports.lint = {
  js: {
    src: ['bin/www', './**/*.js', '!./node_modules/**', '!./public/**', '!./src/static/**']
  }
};
