'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
gulp.task('jslibs', function () {
   return gulp.src('js/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('js'));
});

gulp.task('jslibs:watch', function () {
    gulp.watch('libs/*.js', gulp.series('jslibs'));
 });