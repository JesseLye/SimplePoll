var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba'),
pseudoClasses = require('postcss-pseudo-classes');

gulp.task('styles', function() {
  return gulp.src('./theOutskirts/index.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer, pseudoClasses]))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./src'));
});
