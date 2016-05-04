/**
 * Created by Hlavo on 11.4.16.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var del = require('del');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

var paths = {
    scripts: 'src/**/*.js',
    styles: 'src/**/*.scss',
    images: 'src/images/*',
    jade: 'src/jade/*.jade',
    font: 'src/fonts/*',
    php: 'src/php/*'
};

gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('font', function() {
    return gulp.src(paths.font)
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('php', function() {
    return gulp.src(paths.php)
        .pipe(gulp.dest('dist/php'))
})

gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src('src/jade/index.jade')
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src('src/styles/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['clean','font','php','jade','sass','scripts','images'], function() {
    browserSync.init({
        server: "/Users/Hlavo/www/hlavoDesign/dist"
        // SET THE ROOT FOLDER OF THE PROJECT
    });
    gulp.watch('src/jade/**/*', ['jade']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.styles, ['sass']);
    gulp.watch("dist/index.html").on('change', browserSync.reload);
});

gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.styles, ['sass']);
});
