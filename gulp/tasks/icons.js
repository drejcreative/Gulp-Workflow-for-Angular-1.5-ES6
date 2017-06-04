const gulp = require('gulp'),
      del = require('del'),
      svgSprite = require("gulp-svg-sprites"),
      filter    = require('gulp-filter'),
      svg2png   = require('gulp-svg2png'),
      spritesmith = require('gulp.spritesmith');

module.exports = function() {

    //Copy images for build
    gulp.task('copyDevImages', ['spriteSvg'], function () {
      return gulp.src(['./app/images/**/*'])
            .pipe(gulp.dest('./build/images'));
    });

    //Creating sprites from svg vector images
    gulp.task('spriteSvg', function () {
      return gulp.src('./app/images/svg/*.svg')
            .pipe(svgSprite({
              //mode: "symbols"
            }))
            // .pipe(filter("app/images/**/*.svg"))    // # Filter out everything except the SVG file
            // .pipe(svg2png())                        // # Create a PNG
            .pipe(gulp.dest("./build/images/icons"));
    });

};
