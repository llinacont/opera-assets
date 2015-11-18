/**
 *
 *  Opera
 *  Copyright 2015 Foulders Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  merge = require('merge-stream'),
  minifyCSS = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
  

// ***** Production build tasks ****** //

gulp.task('default', ['js', 'css', 'fonts']);

// Optimize Images
/*
gulp.task('images', function() {
  return gulp.src('src/.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});
*/

// Compile Javascript
gulp.task('js', function() {
  var jquery = gulp.src('js/vendor/jquery*.js')
  var js = gulp.src(['js/**/*.js', '!js/vendor/jquery*.js'])

  return merge(js, jquery)
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
});

// Compile CSS
gulp.task('css', function(){
  return gulp.src('css/**/*.css')
  .pipe(minifyCSS({keepSpecialComments : 0}))
  .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(concat('main.min.css'))
  .pipe(gulp.dest('dist/css/'))
});

// Copy Fonts
gulp.task('fonts', function() {
    return gulp.src('fonts/*')
    .pipe(gulp.dest('dist/fonts/'));
});