var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {
    return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(ts({
            noImplicitAny: true,
            jsx: "react",
            module: "amd",
            target: "ES6"
        }))
        .pipe(gulp.dest('scripts'));
});