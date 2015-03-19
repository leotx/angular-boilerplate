var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');

var WATCH_MODE = 'watch';
var RUN_MODE = 'run';
var mode = RUN_MODE;

gulp.task('js', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('template', function() {
  var templateTask = gulp.src('src/templates/**/*.html');
  templateTask.pipe(htmlmin({ collapseWhitespace: true }));
  templateTask.pipe(gulp.dest('dist/templates'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  var cssTask = gulp.src('src/styles/**/*.css');
  cssTask.pipe(minifyCSS());
  cssTask.pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  if (mode === WATCH_MODE) {
    gulp.watch(['index.html'], function() {
      gulp.src(['index.html'])
        .pipe(connect.reload());
    });
  }

  connect.server({
    livereload: mode === WATCH_MODE
  });
});

gulp.task('watch-mode', function() {
  mode = WATCH_MODE;

  var jsWatcher = gulp.watch('src/scripts/**/*.js', ['js']),
    cssWatcher = gulp.watch('src/styles/**/*.css', ['css']),
    htmlWatcher = gulp.watch('src/templates/**/*.html', ['template']);

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
  htmlWatcher.on('change', changeNotification);
});

gulp.task('assets', ['css', 'js', 'template']);
gulp.task('default', ['watch-mode', 'assets']);
gulp.task('server', ['connect', 'default']);