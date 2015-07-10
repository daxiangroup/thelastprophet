var gulp         = require('gulp'),
    shell        = require('gulp-shell'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css'),
    minifyHTML   = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber');

gulp.task('minifyHTML', function() {
    var opts = {
        conditionals: true,
        spare:true
    };

    return gulp.src('index.html.full')
        .pipe(plumber())
        .pipe(minifyHTML(opts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('JS', function() {
  return gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(gulp.dest('js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('CSS', function() {
  return gulp.src('css/src/*.css')
    .pipe(plumber())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css/dist'));
});

// gulp.task('foundation', function() {
//   return gulp.src('public/css/src/foundation.scss')
//     .pipe(sass({ style: 'compressed', }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('public/css/dist'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(gulp.dest('public/css/dist'));
// });

// // Widgets
// gulp.task('widgets', function() {
//   return gulp.src('public/js/src/widgets/*.js')
//     .pipe(concat('widgets.js'))
//     .pipe(gulp.dest('public/js/dist'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(uglify())
//     .pipe(gulp.dest('public/js/dist'));
// });

// gulp.task('react', function() {
//     return gulp.src('public/js/src/jsx/**/**/*.jsx')
//         .pipe(plumber())
//         .pipe(react())
//         .pipe(gulp.dest('public/js/dist'))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js/dist'));
// });

// //------ Matches ---------------------------------------------------------------
// var library_matches = [
//     'public/js/src/jsx/components/MatchList.jsx',
//     'public/js/src/jsx/components/MatchPercentages.jsx',
//     'public/js/src/jsx/components/MatchControls.jsx',
//     'public/js/src/jsx/components/UserCard.jsx',
// ];

// gulp.task('react-matches', function() {
//     return gulp.src(library_matches)
//         .pipe(plumber())
//         .pipe(react())
//         .pipe(concat('Matches.js'))
//         .pipe(gulp.dest('public/js/dist/libraries'))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js/dist/libraries'));
// });

gulp.task('watch', function() {
    gulp.watch('index.html.full', ['minifyHTML']);
    gulp.watch('js/main.js', ['JS']);
    gulp.watch('css/src/*.css', ['CSS']);
    // gulp.watch('public/js/src/jsx/**/**/*.jsx', ['react', 'react-matches']);
    // gulp.watch('public/css/src/foundation.scss', ['foundation']);
    // gulp.watch('public/css/src/foundation/_settings.scss', ['foundation']);
    // gulp.watch('public/js/src/widgets/*', ['widgets']);
});
