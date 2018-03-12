var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var base64 = require('gulp-base64');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');

var postcss = require('gulp-postcss');
var postcssSvgFragments = require('postcss-svg-fragments');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var watch = require('gulp-watch');

gulp.task('styles', function(){
  var plugins = [
    postcssSvgFragments(),
    autoprefixer({browsers:['last 4 version','ios >= 8']}),
    cssnano()    
  ];
  
  return gulp.src('./src/style/index.scss')    
    .pipe(base64())
    .pipe(postcss(plugins))
    .pipe(sass())
    .pipe(cssmin({
      compatibility:'ie7'
    }))
    .pipe(rename({
      'suffix':'.min'
    }))    
    .pipe(gulp.dest('./build/'))
});

gulp.task('scripts',function(){
  return gulp.src('./src/script/index.js')  
  .pipe(babel())
  .pipe(uglify())  
  .pipe(rename({
    'suffix':'.min'
  }))  
  .pipe(gulp.dest('./build/'))
});

gulp.task('imagesmin', function() {
  return gulp.src('./src/images/**')
      .pipe(imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
      }))
      .pipe(gulp.dest('build/images'))
});

gulp.task('cleans',function(){
  return gulp.src(['./build'],{
    read:false
  }).pipe(clean());
});

gulp.task('default',['cleans'],function(){
  gulp.start('styles','scripts','imagesmin');
});