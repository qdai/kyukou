'use strict';

const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const jade = require('gulp-jade');
const merge = require('merge-stream');
const preprocessify = require('preprocessify');
const saveLicense = require('uglify-save-license');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const uglifyify = require('uglifyify');

const config = require('../config').build;

gulp.task('build:html', () =>
  gulp.src(config.html.src)
    .pipe(jade(config.html.options))
    .pipe(gulp.dest(config.html.dest))
);

gulp.task('build:js', () =>
  merge(config.js.files.map(src => {
    const filename = `${src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))}.bundle.js`;
    return browserify()
      .require(src, { entry: true })
      .transform(preprocessify(config.js.options))
      .transform(uglifyify, {
        global: true,
        output: {
          comments: saveLicense
        }
      })
      .bundle()
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(uglify({
        preserveComments: 'all'
      }))
      .pipe(gulp.dest(config.js.dest));
  }))
);

gulp.task('build:static', ['bower'], () =>
  gulp.src(config.static.src)
    .pipe(gulp.dest(config.static.dest))
);

gulp.task('build', ['build:html', 'build:js', 'build:static']);
