// Dependancies
var gulp        = require('gulp');
var fs          = require("fs");
var path        = require('path');
var browserSync = require('browser-sync').create();
var prettyError = require('gulp-prettyerror');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var zip         = require('gulp-zip');
var template    = require('gulp-html-compile');
var merge       = require('merge-stream');
var htmlPartial = require('gulp-html-partial');
var modRewrite  = require('connect-modrewrite');
var template    = require('gulp-html-compile');
var rename      = require('gulp-rename');
var order       = require("gulp-order");

// Paths
var path = {};
    path.src = './src/';
    path.build = './dist/';

// Types
var type = {};
    type.img = '.{jpeg,jpg,png,gif,svg,cur,ico}';
    type.font = '.{eot,ttf,otf,woff,woff2,svg}';
    type.video = '.{mp4,ogv,webm}';
    type.audio = '.{wav,mp3}';

// Serve files
gulp.task('serve', [], function () {
  browserSync.init({
    server: {
      baseDir: path.build,
      // Single page app mode
      middleware: [
        modRewrite([
          // '!\\.\\w+$ /index.html [L]'
          '^([^.]+)$ /index.html [L]'
        ])
      ]
    }
  });

  function reload() {
    setTimeout(function() {
      browserSync.reload();
    }, 200) 
  }

  gulp.watch(["src/*.html"], ['display']) .on('change', reload);
  gulp.watch("src/public/css/sass/**/*.scss", ['sass']);
  gulp.watch("src/app/**/*.js", ['ryotcontent']).on('change', reload);
  gulp.watch("src/app/views/**/*.js", ['views']).on('change', reload);
  gulp.watch("src/app/parent/**/*.js", ['parent']).on('change', reload);
  gulp.watch("src/public/img/**/*"+type.img, ['assets']).on('change', reload);
});

// HTML display files
gulp.task('display', function() {
  // Parent
  gulp.src([
      "src/parent.html"
    ])
  .pipe(rename('index.html'))
  .pipe(gulp.dest(path.build));
  
  // Iframe
  gulp.src([
      "src/index.html"
    ])
  .pipe(rename('content.html'))
  .pipe(gulp.dest(path.build));
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src("src/public/css/sass/*.scss")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(path.build+'public/css/'))
    .pipe(browserSync.stream({once: true}));
});

// Compile app
gulp.task('ryotcontent', function() {
  // Content bootstrap
  var ryot = gulp.src([
      "src/app/core/core.js",
      "src/app/core/*.js",
      "src/app/components/*.js",
      "src/app/run.js",
    ])
    .pipe(prettyError())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(concat('ryotcontent.js'))
    // .pipe(sourcemaps.write())
    // .pipe(gulp.dest(path.build+'public/js/'));

  // Views
  var views = gulp.src('src/app/view/**/*.html')
    .pipe(prettyError())
    // .pipe(sourcemaps.init())
    .pipe(template({
      name: function(file) {
        return file.relative.split( '.' )[ 0 ];
      },
      namespace: 'views'
    }))
    .pipe(concat('app.js'))
    // .pipe(sourcemaps.write())

  // Merge streams
  merge(views, ryot)
    .pipe(concat('ryotcontent.js'))
    .pipe(gulp.dest(path.build+'public/js/'));
});

// Parent
gulp.task('parent', function() {
  gulp.src([
      'src/app/parent/parent.js',
      'src/app/parent/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('parent.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build+'public/js/'));
});

// Views
gulp.task('views', function() {
  gulp.src('src/app/view/**/*.html')
    .pipe(sourcemaps.init())
    .pipe(template({
      name: function(file) {
        return file.relative.split( '.' )[ 0 ];
      },
      namespace: 'views'
    }))
    .pipe(concat('views.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build+'public/js/'));
});

// Copy JS Libs
gulp.task('libs', function() {
  gulp.src([
      "src/app/lib/*.js"
    ])
  .pipe(gulp.dest(path.build+'public/js/libs/'));
});

// Copy assets
gulp.task('assets', function() {
  gulp.src([
      "src/public/img/**/*"+type.img
    ])
  .pipe(gulp.dest(path.build+'public/img/'));
});

// Default
gulp.task('default', ['serve']);