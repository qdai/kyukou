'use strict';

const del = require('del');
const gulp = require('gulp');

const config = require('../config').clean;

gulp.task('clean', () => {
  return del(config.src);
});
