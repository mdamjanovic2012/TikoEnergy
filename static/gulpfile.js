const gulp = require('gulp');
const eslint = require("gulp-eslint");
const JS_FILES = ['./**/*.js'];
const plumber = require("gulp-plumber");


function watchJSFiles() {
  gulp.watch(JS_FILES).on('change', function(changePath) {
        lintFile(changePath);
  });
};

function lintFile(file) {
    console.log(file);
    gulp.src(file)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

exports.default = watchJSFiles;