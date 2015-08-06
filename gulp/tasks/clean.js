'use strict';

const del = require('del');
const gulp = require('gulp');

const config = require('../config').clean;

gulp.task('clean', function (callback) {
  del(config.dest, callback);
});
