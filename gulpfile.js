var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var cache = require('gulp-cache');
var uncss = require ('gulp-uncss');

var supported = [ //versions for autoprefixer
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
];
//gulp tasks
gulp.task('css', function () {
    return gulp.src(['src/scss/*.scss'])
            .pipe(sass())
            .pipe(uncss({
                html: ['src/**/*.html']
            }))
            .pipe(cssnano({
                autoprefixer: {browsers: supported, add: true}
            }))
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.reload({
                stream: true
            }))
});
//browserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
})
gulp.task('useref', function () {
    return gulp.src('src/*.html')
            .pipe(useref())
            .pipe(gulpIf('*.js', uglify()))
            .pipe(gulpIf('*.css', cssnano()))
            .pipe(gulp.dest('dist'))
});
gulp.task('images', function () {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
            // Caching images that ran through imagemin
            .pipe(cache(imagemin({
                interlaced: true
            })))
            .pipe(gulp.dest('dist/img'))
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
            .pipe(gulp.dest('dist/fonts'))
})
gulp.task('clean:dist', function () {
    return del.sync('dist');
})
//gulp watch
gulp.task('watch', ['browserSync', 'css'], function () {
    gulp.watch('src/scss/**/*.scss', ['css']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});
//gulp build
gulp.task('build', function (callback) {
    runSequence('clean:dist',
            ['css', 'useref', 'images', 'fonts'],
            callback
            )
})
gulp.task('default', function (callback) {
    runSequence(['css', 'browserSync', 'watch'],
            callback
            )
})