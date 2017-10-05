'use strict'

// gulp itself
var gulp = require('gulp');

// gulp plugins
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano')
var pug = require('gulp-pug');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var del = require('del');
var cached = require('gulp-cached');


// src & dest
var paths = {
    sass: {
        src: 'src/sass/**/*.+(sass|scss)',
        dest: 'src/css'
    },
    pug: {
        src: 'src/*.pug',
        dest:'src'
    },
    js: {
        src: 'js/**/*/js',
        dest: 'src'
    },
    useref: {
        src: 'src/*.html',
        dest: 'dist'
    }
}

// ------------------- //
// Development Tasks
// ------------------- //

// compile sass > css
gulp.task('sass', function() {
    return gulp.src(paths.sass.src)

        .pipe(cache('compiling'))

        .pipe(sass().on('error', sass.logError))

        .pipe(gulp.dest(paths.sass.dest))
        
        
})

// compile pug > html
gulp.task('pug', function() {
    return gulp.src(paths.pug.src)

        .pipe(cached('comilingHTML'))

        .pipe(pug({
            pretty: true
        }))

        .pipe(gulp.dest(paths.pug.dest))
})

// browser-sync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    })
})

// watch File
gulp.task('watch', ['sass', 'pug'], function() {

    // html
    gulp.watch(paths.pug.src, ['pug']).on('change', browserSync.reload)

    // css
    gulp.watch(paths.sass.src, ['sass']).on('change', browserSync.reload)

    // js
    gulp.watch(paths.js.src).on('change', browserSync.reload)

})

// del dist
gulp.task('clean:dist', function() {
    return del.sync('dist');
})

// build
gulp.task('build', function(e) {
    runSequence(
        'clean:dist',
        ['pug', 'sass'],
        'useref'
    )
})

gulp.task('default', ['pug', 'sass', 'browserSync', 'watch'])
