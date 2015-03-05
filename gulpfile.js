var browserify = require('browserify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var gutil = require('gutil');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

// PATHS

var resourcesDir = './client';

// DEV TASKS

gulp.task('less', function () {
    gulp.src('client/styles/styles.less')
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest('public/css'))
});

gulp.task('react', function () {
    return browserify('./client/client.js')
        .transform(reactify)
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('./client', ['less']);
    gulp.watch('./client', ['react']);
});

// PROD TASKS

// DEFAULT

gulp.task('default', ['watch']);
