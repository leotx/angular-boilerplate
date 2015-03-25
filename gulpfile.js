var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var imagemin = require('gulp-imagemin');
var ngAnnotate = require('gulp-ng-annotate');

var WATCH_MODE = 'watch';
var RUN_MODE = 'run';
var mode = RUN_MODE;
var injectMode = 'src'

gulp.task('js', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(ngAnnotate())
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
  cssTask.pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});

gulp.task('image', function () {
  gulp.src('src/images/**.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
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
    imageWatcher = gulp.watch('src/images/**/*', ['image']),
    htmlWatcher = gulp.watch('src/templates/**/*.html', ['template']);

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type, ', running tasks...');
  }

  jsWatcher.on('change', changeNotification);
  cssWatcher.on('change', changeNotification);
  imageWatcher.on('change', changeNotification);
  htmlWatcher.on('change', changeNotification);
});

gulp.task('inject', function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['dist/lib/jquery/dist/jquery.min.js',
        'dist/lib/angular/angular.min.js',
        'dist/lib/angular-route/angular-route.min.js',
        'dist/lib/angular-resource/angular-resource.min.js',
        'dist/lib/semantic-ui/dist/semantic.min.js',
        'dist/lib/semantic-ui/dist/semantic.min.css',
        injectMode + '/scripts/app.js',
        injectMode + '/scripts/**/*.js',
        injectMode + '/styles/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest(''));
});


gulp.task('server-inject', function(){
    injectMode = 'dist'
});

gulp.task('assets', ['css', 'js', 'template', 'image']);
gulp.task('default', ['assets', 'watch-mode']);
gulp.task('server', ['default', 'server-inject', 'inject', 'connect']);
gulp.task('dev', ['default', 'inject', 'connect']);