var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
// var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

// clean dist 目录
gulp.task('clean', function() {
  del(['./dist', 'server/dist']);
});

// 打包 less 文件
gulp.task('less', ['clean'], function () {
  gulp.src('less/bootstrap.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('server/static/css')) // 打包到 server 目录
});

// 压缩 css 文件
gulp.task('css', ['clean'], function() {
  gulp.src('less/bootstrap.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename('./bootstrap.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('server/static/css'))
});

// sourcemap 有问题 没有生成正确的json结构
gulp.task('sourcemap', function() {
  gulp.src('less/bootstrap.less')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.identityMap())
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(''))
    .pipe(rename('./bootstrap.css.map'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('server/static/css'))
});

// 合并所有 js 文件到一个文件
gulp.task('concat', function() {

});

// uglify js
gulp.task('uglify', function() {

});

// csslint
gulp.task('csslint', function() {

});
// csscomb
gulp.task('csscomb', function() {

});
// server
gulp.task('server', function() {
  
});
// watch
gulp.task('watch', function() {

});

// 使用 gulp.task('default') 定义默认任务
gulp.task('default', ['clean','less', 'css', 'sourcemap'])
