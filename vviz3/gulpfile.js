'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
gulp.task('jslibs', function () {
   return gulp.src('libs/*.js')
   .pipe(concat('libs.js'))
   .pipe(uglify())
   .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest('.'));
});

gulp.task('js', function () {
   return gulp.src('js/*.js')
   .pipe(concat('app.js'))
   .pipe(uglify())
   .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest('.'));
});

gulp.task('jslibs:watch', function () {
    gulp.watch('libs/*.js', gulp.series('jslibs'));
 });