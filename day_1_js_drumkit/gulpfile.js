// include gulp
var gulp = require('gulp');

// include our plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var gulpCleanCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence')

var paths = {
    pug: {
        src: 'src/*.pug',
        dest: 'src'
    },
    sass: {
        src: 'src/sass/**/*.+(sass|scss)',
        dest: 'src/css'
    },
    useref: {
        src: 'src/index.html',
        dest: 'dist'
    },
    browserSync: {
        src: 'src'
    },
    images: {
        src: 'src/images/*',
        dest: 'dist/images/**/*.+(png|jpg|gif|svg)'
    },
    font: {
        src: 'src/fonts/**/*',
        dest: 'dist/fonts'
    }
}

// Our lint task checks any JavaScript file in our js/ directory and makes sure there are no errors in our code.
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')

        .pipe(jshint())

        .pipe(jshint.reporter('default'));
});

// compile our sass
gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(sass())

        .pipe(gulpCleanCSS())

        .pipe(gulp.dest(paths.sass.dest))
});

// compile pug
gulp.task('pug', function() {
    return gulp.src(paths.pug.src)

        .pipe(pug({
            inlineRuntimeFunctions: false
        }))

        .pipe(gulp.dest(paths.pug.dest))

        .pipe(browserSync.reload({
            stream: true
        }))
})

// minify image
gulp.task('imagemin', function() {
    return gulp.src(paths.images.src)

        .pipe(cache(imagemin([
            imagemin.gifsicle( {interlaced: true} )
        ])))

        .pipe(gulp.dest(paths.images.dest))

})

// font transfer
gulp.task('fonts', function() {
    return gulp.src(paths.font.src)
        .pipe(gulp.dest(paths.font.dest))
})

// multi tasks
gulp.task('useref', function() {
    return gulp.src(paths.useref.src)
         // useref
        .pipe(useref())
        // minify css
        .pipe(gulpIf('*.css', gulpCleanCSS()))
        // minify js
        .pipe(gulpIf('*.js', uglify()))

        .pipe(gulp.dest(paths.useref.dest))
})

// browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.src
        },
    })
})

// cleaning
gulp.task('clean', function() {
    return del.sync('dist')
        .then(function(cb) {
            return cache.clearAll(cb)
        });
})

gulp.task('clean:dist', function() {
    return del.sync('dist/**/*', '!dist/images', '!dist/images/**/*');
})

// cleaning cache
gulp.task('cache:clear', function() {
    return cache.clearAll(callback)
})

// watch files for changes
gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
    gulp.watch('src/js/**/*.js', ['lint']).on('change', browserSync.reload);
    gulp.watch( paths.sass.src , ['sass'] ).on('change', browserSync.reload);
    gulp.watch( paths.pug.src , ['pug']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// default task
gulp.task('default', function(callback) {
    runSequence(
        ['sass', 'browserSync', 'watch', 'pug'],
        callback
    )
});


// build task
gulp.task('build', function(callback) {

    runSequence(
        'clean:dist',
        ['pug', 'sass'],
        [ 'useref', 'imagemin', 'fonts' ], 
        callback
    );
    
    console.log('Building files');

})