'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    modifyCssUrls = require('gulp-modify-css-urls');

var custom_path = {
    src: {
        style: 'css/style.scss',
        font: 'css/fonts/**/*.css'

    },
    build: {
        style: 'css/',
        font: 'css/'
    },
    watch: {
        style: 'css/**/*.scss',
    },
};


gulp.task('font:build', gulp.series(function (done) {
    gulp.src(custom_path.src.font)
        .pipe(cleanCSS({
            rebaseTo: '.',
        }))
        .pipe(modifyCssUrls({
            modify: function (url, filePath) {
                return url;
            },
            prepend: '../',
        }))
        .pipe(concat('fonts.min.css'))
        .pipe(gulp.dest(custom_path.build.font));
    done();
}));



gulp.task('browser-sync', gulp.series(function (done) {
    var files = [
        '**/*.html',
        'css/**/*.scss',
        'js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        },
        tunnel: false,
        host: 'localhost',
        port: 7777,
        open: true,
    });
    done();
}));

gulp.task('style:build', gulp.series(function (done) {
    gulp.src(custom_path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9', 'ie 10', 'ie 11'],
        }))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(custom_path.build.style));
    done();
}));


gulp.task('watch', gulp.series(function (done) {
    gulp.watch([custom_path.watch.style], gulp.series('style:build'));
    done();
}));

gulp.task('default', gulp.series('watch'));