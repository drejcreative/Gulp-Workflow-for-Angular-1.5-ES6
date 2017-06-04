(function() {
    "use strict";

    var gulp = require('./gulp')([
        'styles',
        'scripts',
        'icons',
        'browserSync',
        'optimization'
    ]);

    gulp.task('default', ['sync', 'browserify', 'copyDevImages'], function() {});
    gulp.task('build', ['sass', 'fonts'], function() {});

}());
