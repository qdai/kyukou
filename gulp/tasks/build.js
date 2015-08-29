'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const less = require('gulp-less');
const minify = require('gulp-minify-css');
const preprocess = require('gulp-preprocess');
const uglify = require('gulp-uglify');

const config = require('../config').build;

gulp.task('build:css', function () {
  return gulp.src(config.css.src)
    .pipe(less())
    .pipe(minify())
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('build:html', function () {
  return gulp.src(config.html.src)
    .pipe(jade(config.html.options))
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('build:js', function () {
  return gulp.src(config.js.src)
    .pipe(preprocess(config.js.options))
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('build:static', ['bower'], function () {
  return gulp.src(config.static.src)
    .pipe(gulp.dest(config.static.dest));
});

gulp.task('build', ['build:css', 'build:html', 'build:js', 'build:static']);