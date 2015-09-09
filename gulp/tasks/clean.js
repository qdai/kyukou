'use strict';

const del = require('del');
const gulp = require('gulp');

const config = require('../config').clean;

gulp.task('clean', callback => {
  del(config.src, callback);
});
