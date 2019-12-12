let gulp = require('gulp'); //сам gulp
let rename = require('gulp-rename'); // добавляет переменовку и минификацию
let sass = require('gulp-sass') //комрилятов из sass в css
let autoprefixer = require('gulp-autoprefixer') //добавляет автопрефиксер
let sourcemaps = require('gulp-sourcemaps') //добавляет sourcemap для нормального отображения стилей в DevTools
var browserSync = require('browser-sync').create(); // удаленный сервер


function css_style(done) {
  gulp.src('./scss/**/*')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsol: true,
      outputStyle: 'compressed',
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream()) // hot reload 

  done();
}

function watch() {
  gulp.watch('./scss/**/*', css_style); // слежение за файлами и обновление файлов
  gulp.watch('./**/*.html', browserReload); // слежение за файлами и обновление файлов
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

function browserReload(done) {
  browserSync.reload();

  done();
}

gulp.task('default', gulp.parallel(watch, sync))
gulp.task(sync);
