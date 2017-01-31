var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();




//gulp tasks
//gulp sass
gulp.task('sass',function(){
    return gulp.src('src/scss/**/*.scss') //gets all files ending with scss
            .pipe(sass())
            .pipe(gulp.dest('src/css')) 
            .pipe(broswerSync.reload({
                stream:true
            }))
});
//gulp watch
gulp.task('watch',function(){
    gulp.watch('src/scss/**/*.scss',['sass']);
});
//browserSync
gulp.task('browserSync',function(){
    broswerSync.init({
        server: {
            baseDir: 'src'
        }
    })
});