const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      useref = require('gulp-useref'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssnano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      runSequence = require('run-sequence'),
      imgRetina = require('gulp-img-retina'),

      notify        = require('gulp-notify'),
      source        = require('vinyl-source-stream'),
      browserify    = require('browserify'),
      babelify      = require('babelify'),
      ngAnnotate    = require('browserify-ngannotate'),
      rename        = require('gulp-rename'),
      templateCache = require('gulp-angular-templatecache'),
      merge         = require('merge-stream');

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

  // Optimizing HTML and CSS files
 gulp.task('html-copy', ['clean:dist', 'copyDevImages', 'browserify'], function() {
   return gulp.src('app/index.html')
     .on('error', interceptErrors)
     .pipe(gulp.dest('./build/'));
 });

  // HTML usref
  gulp.task('useref', ['html-copy'], function() {
    return gulp.src('build/index.html')
      .on('error', interceptErrors)
      .pipe(imgRetina())
      .pipe(useref())
      .pipe(gulpIf('js/main.min.js', uglify()))
      .pipe(gulpIf('css/main.min.css', cssnano()))
      .pipe(gulp.dest('./dist/'));
  });

  // Optimizing Images
  gulp.task('images', ['useref'], function() {
    return gulp.src('./build/images/**/*.+(png|jpg|jpeg|gif|svg)')
      // Caching images that ran through imagemin
      .pipe(cache(imagemin({
        interlaced: true,
      })))
      .pipe(gulp.dest('./dist/images'));
  });

  // Copying fonts
  gulp.task('fonts', ['images'], function() {
    return gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
  });

  // Cleaning
  gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
      return cache.clearAll(cb);
    });
  });

  gulp.task('clean:dist', function() {
    return del.sync(['./dist/**/*', '!dist/images', '!dist/images/**/*']);
  });

};
