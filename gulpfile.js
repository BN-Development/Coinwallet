'use strict';

var gulp = require('gulp'),
  scss = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  flexfixes = require('postcss-flexbugs-fixes'),
  autoprefixer  = require('gulp-autoprefixer'),
  stripCssComments = require('gulp-strip-css-comments'),
  browsers = require('./browsers.json'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil = require('gulp-util'),
  gulpif = require('gulp-if'),
  cssbeautify = require('gulp-cssbeautify'),
  rigger = require('gulp-rigger'),
  bourbon = require('node-bourbon').includePaths;

const env = gutil.env.env ? gutil.env.env : 'dev';

gulp.task('scss', () => {
  return gulp
    .src(`./app/scss/*.scss`)
    .pipe(plumber({}))
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(scss({
      outputStyle: 'nested',
      includePaths: bourbon
    }).on('error', scss.logError))
    .pipe(gulpif(env !== 'dev', stripCssComments()))

    
    .pipe(autoprefixer({
      browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"],
      cascade: false
    }))

    .pipe(postcss([
      flexfixes()
    ]))

  .pipe(gulpif(env === 'dev', sourcemaps.write('.')))
    .pipe(gulpif(env !== 'dev', cssbeautify({
      indent: '  ',
      openbrace: 'end-of-line',
      autosemicolon: true
    })))
    .pipe(gulp.dest("./dist/css/"))
});


// livereload
var browser_sync = require('browser-sync');

gulp.task('livereload', () => {
  browser_sync.init({
    files: [{
      match: [`./app/*`],
      fn: (event, file) => {
        /** Custom event handler **/
      },
      options: {
        ignored: '*.css.map'
      }
    }],
    open: 'local',
    reloadOnRestart: true,
    port: gutil.env.port || 3000,
    server: {
      baseDir: `./dist/`,
      index: "index.html",
      directory: false
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
  })
});

// markup
gulp.task('markup', () => {
  return gulp
    .src(
      `./app/*.html`
    )
    .pipe(plumber({
    }))
    .pipe(rigger())
    .pipe(gulp.dest(`./dist/`))
});

// static
gulp.task('static', () => {
  return gulp
    .src(`./app/**/*, !./app/scss/*`)
     .pipe(plumber({
     }))
    .pipe(gulp.dest(`./dist/css/`));
});

/**/
var browserSync = require('browser-sync');

gulp.task('watch', gulp.series(function (){
  browserSync.init({
      server: {
          baseDir: './dist/'
      }
  });

  gulp.watch('./app/*.html', gulp.series('markup'));
  gulp.watch(['./app/*.html']).on('change', browserSync.reload);

  gulp.watch('./app/scss/*.{scss,css}', gulp.series('scss'));
  gulp.watch(['./app/scss/*.{scss,css}']).on('change', browserSync.reload.bind(null, './dist/css/*'));

  gulp.watch('./app/**/*', gulp.series('static'));
  gulp.watch(['./app/**/*']).on('change', browserSync.reload);

}));

gulp.task('default', gulp.series(
    gulp.parallel(
      'markup',
      'scss',
      'static',
    ),
    'watch',
    'livereload',
 ));