var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var path = require('path');
var notify = require("gulp-notify");
var reactify = require('reactify');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

// PATHS

var sourceDir = __dirname + '/../client';
var outputDir = __dirname + '/../public';
var hashDir = __dirname + '/../server/config';
var hashPath = hashDir + '/assets.json';

var jsSourceDir = sourceDir + '/client.js';
var jsOutputDir = outputDir + '/js';
var jsFile = 'scripts.js';

var cssSourceDir = sourceDir + '/styles/styles.less';
var cssOutputDir = outputDir + '/css';
var cssWatch = sourceDir + '/styles/**/*.less';

// PROD TASKS

gulp.task('prod-js', function () {
    return processJS(true, false);
});

gulp.task('prod-css', function () {
    return processCSS(true);
});

// DEV TASKS

gulp.task('dev-js', function() {
    return processJS(false, true);
});

gulp.task('dev-css', function () {
    return processCSS(false);
});

gulp.task('watch', ['dev-js'], function() {
    gulp.watch(cssWatch, ['dev-css']);
});

// FUNCTIONS

function processJS(prod, watch) {
    var bundler = browserify(jsSourceDir, {
        basedir: __dirname,
        debug: !prod,
        cache: {},
        packageCache: {},
        fullPaths: watch
    });

    if (watch) {
        bundler = watchify(bundler);
    }

    bundler.transform(reactify);

    var pipe = function() {
        return bundler
            .bundle()
            .on('error', processErrors)
            .pipe(source(jsFile))
            .pipe(prod ? streamify(uglify()) : gutil.noop())
            .pipe(gulp.dest(jsOutputDir))
            .pipe(streamify(rev())) // Note this is not saving a renamed file, just saving a checksum
            .pipe(rev.manifest({
                base: hashDir,
                merge: true,
                path: hashPath
            }))
            .pipe(gulp.dest(hashDir))
        ;
    };

    bundler.on('update', pipe);
    bundler.on('log', gutil.log);
    return pipe();
}

function processCSS(prod) {
    return gulp.src(cssSourceDir)
        .pipe(less().on('error', processErrors))
        .pipe(prod ? minifycss() : gutil.noop())
        .pipe(gulp.dest(cssOutputDir))
        .pipe(rev()) // Note this is not saving a renamed file, just saving a checksum
        .pipe(rev.manifest({
            base: hashDir,
            merge: true,
            path: hashPath
        }))
        .pipe(gulp.dest(hashDir))
    ;
}

function processErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify
        .onError({
            title: "Compile Error",
            message: "<%= error.message %>"
        })
        .apply(this, args)
    ;

    this.emit('end');
}
