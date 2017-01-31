var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//gulp tasks
//gulp sass
gulp.task('sass',function(){
    return gulp.src('src/scss/**/*.scss') //gets all files ending with scss
            .pipe(sass())
            .pipe(gulp.dest('src/css')) 
            .pipe(browserSync.reload({
                stream:true
            }))
});
//browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})
//gulp watch
gulp.task('watch',['browserSync','sass'],function(){
    gulp.watch('src/scss/**/*.scss',['sass']);
            gulp.watch('src/*.html', browserSync.reload);
            gulp.watch('src/js/**/*.js', browserSync.reload);
});