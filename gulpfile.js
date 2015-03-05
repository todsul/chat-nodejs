var gulp = require('gulp');
var gutil = require('gutil');
var browserify = require('browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

// VARIABLES

var env = 'dev';
var prod = (env === 'prod');

// PATHS

var clientDir = './client';
var outputDir = './public';

var browserifySource = clientDir + '/client.js';
var browserifyOutput = outputDir + '/js/';
var browserifyFile = 'scripts.js';

var lesscssSource = clientDir + '/styles/styles.less';
var lesscssOutput = outputDir + '/css/';

// TASKS

gulp.task('browserify', function () {
    return browserify(browserifySource)
        .transform(reactify)
        .on('error', gutil.log)
        .bundle()
        .pipe(source(browserifyFile))
        .pipe(gulp.dest(browserifyOutput))
    ;
});

gulp.task('lesscss', function () {
    gulp.src(lesscssSource)
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest(lesscssOutput))
    ;
});

gulp.task('watch', function() {
    gulp.watch('./client/**/*.js', ['browserify']);
    gulp.watch('./client/styles/**/*.less', ['lesscss']);
});

// PROD TASKS

// DEFAULT

gulp.task('default', ['watch']);
