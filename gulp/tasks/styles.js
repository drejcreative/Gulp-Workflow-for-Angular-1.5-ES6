const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync'),
      pxtorem = require('gulp-pxtorem');

      // #Autiprefixer options
      const autoprefixerOptions = {
        browsers: ['last 20 versions', '> 5%', 'Firefox ESR']
      };

      const pxtoremOptions = {
          replace: false
      };


module.exports = function() {

    // #Scss with Autoprefixer - Adding all cross browser prefixes
    gulp.task('sass', function() {
      return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))  // # Adding cross browser prefixes
        .pipe(pxtorem(pxtoremOptions))            // # Converting PX to Rem with px fallback for older browsers
        .pipe(gulp.dest('./build/css/'))          // # Outputs it in the css folder
        .pipe(browserSync.reload({
          stream: true
        }));
    });

    // Copying fonts to DEV
    gulp.task('fontsDev', ['sass'], function() {
      return gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
    });

    gulp.task('htmlDev', ['fontsDev'], function() {
      return gulp.src('./app/index.html')
        .pipe(gulp.dest('./build/'));
    });

};
