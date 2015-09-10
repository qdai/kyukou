'use strict';

const bower = require('bower');
const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');

const config = require('../config').bower;

gulp.task('bower:install', callback => {
  bower.commands.install().on('end', () => {
    callback();
  }).on('error', err => {
    callback(err);
  });
});

gulp.task('bower', ['bower:install'], () => {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest(config.dest));
});
