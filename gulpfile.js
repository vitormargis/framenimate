var gulp = require('gulp'),
    uglify = require('gulp-uglify');
    rename = require("gulp-rename");


gulp.task('compress', function() {
  return gulp.src('./src/framenimate.js')
    .pipe(uglify())
    .pipe(rename('framenimate.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['compress']);
