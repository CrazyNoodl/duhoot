const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function cssStyle(done) {
  gulp.src('./scss/**/*')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsol: true,
      outputStyle: 'compressed',
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  gulp.watch('./scss/**/*', cssStyle);
  gulp.watch('./**/*.html', browserReload);
}

function sync() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

gulp.task('default', gulp.parallel(watch, sync));
gulp.task(sync);
