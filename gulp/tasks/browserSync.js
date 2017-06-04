const gulp        = require('gulp'),
      browserSync = require('browser-sync');

const jsFiles   = 'app/js/**/*.js';
const viewFiles = 'app/js/**/*.html';

module.exports = function() {

  gulp.task('sync', ['htmlDev'], function() {

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/index.html', ['htmlDev']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['browserify']);
    gulp.watch('app/images/**/*', ['copyDevImages']);
    gulp.watch('app/images/svg/*.svg', ['spriteSvg']);

    browserSync.init({
      server: {
        baseDir: './build',
        routes: {
            '/bower_components': 'bower_components'
        }
      },
      port: 4000,
      notify: false,
      ui: {
        port: 4001
      }
    });
  });

};
