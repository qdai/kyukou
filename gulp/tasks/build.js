'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');

const config = require('../config').build;

gulp.task('build:html', () =>
  gulp.src(config.html.src)
    .pipe(jade(config.html.options))
    .pipe(gulp.dest(config.html.dest))
);

gulp.task('build', ['build:html']);
