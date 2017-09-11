var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var rm = require('gulp-rimraf');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
  return gulp.src('build', { read: false })
        .pipe(rm());
});

gulp.task('babel', ['clean'], function() {
  return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('browserify', ['babel'], function() {
  return gulp.src('build/index.js')
        .pipe(browserify({
          standalone: 'Roler'
        }))
        .pipe(uglify())
        .pipe(rename('roler.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('test', function() {
  return gulp.src('test/index.js', { read: false })
        .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('prod', ['lint', 'babel', 'browserify']);

gulp.task('dev', ['babel', 'browserify']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['dev']);
});
