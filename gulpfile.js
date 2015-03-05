var gulp = require('gulp');
var gutil = require('gutil');
var browserify = require('browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

// PATHS

var clientDir = './client'
var outputDir = './public'

var browserifySource = clientDir + '/client.js';
var browserifyOutput = outputDir + '/js/';
var browserifyFile = 'scripts.js';

var lesscssSource = clientDir + '/styles/styles.less';
var lesscssOutput = outputDir + '/css/';

// DEV TASKS

gulp.task('browserify', function () {
    return browserify(browserifySource)
        .transform(reactify)
        .on('error', gutil.log)
        .bundle()
        .pipe(source(browserifyFile))
        .pipe(gulp.dest(browserifyOutput));
});

gulp.task('lesscss', function () {
    gulp.src(lesscssSource)
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest(lesscssOutput))
});

gulp.task('watch', function() {
    gulp.watch(clientDir, ['browserify']);
    gulp.watch(clientDir, ['lesscss']);
});

// PROD TASKS

// DEFAULT

gulp.task('default', ['watch']);
