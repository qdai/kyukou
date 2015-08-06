'use strict';

const bower = require('bower');
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');

const config = require('../config').bower;

gulp.task('bower:install', function (callback) {
  bower.commands.install().on('end', function () {
    callback();
  }).on('error', function (err) {
    callback(err);
  });
});

gulp.task('bower', ['bower:install'], function () {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest(config.dest));
});
