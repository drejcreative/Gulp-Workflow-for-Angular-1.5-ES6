const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      notify        = require('gulp-notify'),
      source        = require('vinyl-source-stream'),
      browserify    = require('browserify'),
      babelify      = require('babelify'),
      ngAnnotate    = require('browserify-ngannotate'),
      rename        = require('gulp-rename'),
      templateCache = require('gulp-angular-templatecache'),
      merge         = require('merge-stream');

      const jsFiles   = 'app/js/**/*.js';
      const viewFiles = 'app/js/**/*.html';

      // Push Errors
      const interceptErrors = function(error) {
        const args = Array.prototype.slice.call(arguments);
        // Send error to notification center with gulp-notify
        notify.onError({
          title: 'Compile Error',
          message: '<%= error.message %>'
        }).apply(this, args);
        // Keep gulp from hanging on this task
        this.emit('end');
      };

module.exports = function() {

  gulp.task('browserify', ['views'], function() {
    return browserify('./app/js/app.js')
        .transform(babelify, {presets: ['es2015']})
        .transform(ngAnnotate)
        .bundle()
        .on('error', interceptErrors)
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.reload({
          stream: true
        }));
  });

  gulp.task('views', function() {
    return gulp.src(viewFiles)
        .pipe(templateCache({
          standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename('app.templates.js'))
        .pipe(gulp.dest('app/js/config/'));
  });

};
