'use strict';

const apidoc = require('apidoc');
const fs = require('fs');
const gulp = require('gulp');

const config = require('../config').apidoc;
const apiList = function (apiData) {
  const list = {};
  apiData.forEach(function (el) {
    if (!list[el.group]) {
      list[el.group] = [];
    }
    list[el.group].push(el.title);
  });
  return list;
};

gulp.task('apidoc', function (callback) {
  const chunk = apidoc.createDoc({
    src: config.src,
    parse: true,
    debug: false
  });
  if (chunk.data && chunk.project) {
    chunk.data = JSON.parse(chunk.data);
    chunk.project = JSON.parse(chunk.project);
    chunk.list = apiList(chunk.data);
    fs.writeFileSync(config.dest, JSON.stringify(chunk));
    callback();
  } else {
    callback(new Error('apiDoc execution terminated (set "debug: true" for details).'));
  }
});
