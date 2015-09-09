'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');

const config = require('../config').lint;

gulp.task('lint:js', () => {
  return gulp.src(config.js.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint:js']);
