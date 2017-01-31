var gulp = require('gulp');
var sass = require('gulp-sass');

//gulp tasks
gulp.task('sass',function(){
    return gulp.src('src/scss/**/*.scss') //gets all files ending with scss
            .pipe(sass())
            .pipe(gulp.dest('src/css')) 
});