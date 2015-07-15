var gulp   = require('gulp');
var mocha  = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');

gulp.task(('default'), ['test', 'lint', 'style', 'watch'], function() {});

gulp.task('test', function() {
  return gulp.src('test/*.js')
             .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('lint', function() {
  return gulp.src(['test/*js', '*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('style', function() {
  return gulp.src(['test/*js', '*.js'])
             .pipe(jscs());
});

gulp.task('watch', function() {
  return gulp.watch(['test/*js', '*.js'], ['test', 'lint', 'style']);
});
