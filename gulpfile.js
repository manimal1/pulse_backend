'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var chalk = require('chalk');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var collapse = require('bundle-collapser/plugin');

gulp.task('serve', function() {
  nodemon({
    script: 'app',
    ext: 'js jsx jade',
    ignore: ['public/dist/scripts/*']
  });
});

gulp.task('serve-hapi', function() {
  nodemon({
    script: 'app-hapi',
    ext: 'js jsx jade',
    ignore: ['public/dist/scripts/*']
  });
});


gulp.task('sass', function() {
  gulp.src('./app/assets/stylesheets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/stylesheets/public'));
});

gulp.task('js', function() {
  return browserify('./app/assets/javascripts/main.js')
    .bundle()
    .on('error', function(e) {
      gutil.log(e);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/assets/javascripts/public'));
});

gulp.task('watch', function watch() {
  gulp.start([
    'serve',
    'sass',
    'js'
  ], function () {
    // in theory, stream CSS to browser so it doesn't need to reload (NOT working!!)
    gulp.watch('./app/assets/stylesheets/scss/**/*.scss', ['sass']);
  });
});

gulp.task('watch-hapi', function watchHapi() 
{
  gulp.start([
    'serve-hapi',
    'sass',
    'js'
  ], function () {
    // in theory, stream CSS to browser so it doesn't need to reload (NOT working!!)
    gulp.watch('./app/assets/stylesheets/scss/**/*.scss', ['sass']);
  });
} );

gulp.task('default', ['watch']);
gulp.task('hapi', [ 'watch-hapi'] );

// ========================= trying out new config below ================== //

// var options = {
//   minify: !!$.util.env.minify,
//   watch: false
// };

// gulp.task('js', function javascript () {
//   // allow us to build multiple browserify bundles
//   function buildJs (config) {
//     var bundler = browserify({
//       // Required watchify args
//       cache: {},
//       packageCache: {},
//       fullPaths: options.watch, // only need fullPaths if we're watching
//
//       // Specify the entry point of your app
//       entries: config.entries,
//
//       // Enable source maps!
//       debug: true
//     })
//
//     if (!options.watch) {
//       bundler.plugin(collapse)
//     }
//
//     function bundle () {
//       console.log('bundling...')
//       var jsStream = bundler
//         .bundle()
//         .on('error', function (error) {
//           console.error(chalk.red('=============================='))
//           console.error(chalk.red('!! Error building javascript!'))
//           console.error(error.message)
//           console.error(chalk.red('=============================='))
//           this.emit('end')
//         })
//         .pipe(source(config.outputName))
//         .pipe(buffer())
//         .pipe($.plumber())
//         .pipe($.sourcemaps.init({loadMaps: true}))
//           .pipe($.if(options.minify, $.uglify()))
//         .pipe($.sourcemaps.write('./'))
//         .pipe(gulp.dest('./public'))
//         .on('finish', function () {
//           console.log('done')
//           if (options.watch) {
//             browserSync.reload('./public/' + config.outputName)
//           }
//         })
//
//       return jsStream
//     }
//
//     if (options.watch) {
//       console.log('Starting watchify...')
//       bundler = watchify(bundler)
//       bundler.on('update', bundle)
//     }
//
//     return bundle()
//   }
//
//   // add new bundles here
//   return merge([{
//     entries: ['./app.js'],
//     outputName: 'pulse.js'
//   }].map(c => buildJs(c)))
// })
//
// gulp.task('js:libs', function jsLibs () {
//   return gulp.src([
//     './node_modules/lodash/index.js',
//     './node_modules/moment/moment.js'
//   ])
//   .pipe($.if(options.minify, $.uglify()))
//   .pipe($.concat('libs.js'))
//   // .pipe($.changed('./public'))
//   .pipe(gulp.dest('./public/javascripts'))
// })
//
// gulp.task('sass', function sass () {
//   return merge(
//     gulp.src('./app/assets/stylesheets/scss/main.scss')
//       .pipe($.sourcemaps.init())
//       .pipe($.sass({
//         outputStyle: 'expanded',
//         precision: 10,
//         includePaths: ['.']
//       }).on('error', $.sass.logError))
//       .pipe($.autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//       }))
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('./public/styles'))
//     .pipe($.if(options.watch, browserSync.stream({match: '**/main.css'}))),
//
//     gulp.src([
//       './node_modules/leaflet/dist/leaflet.css'
//     ])
//     .pipe($.concat('libs.css'))
//     .pipe(gulp.dest('./public/styles'))
//     )
// })
//
// gulp.task('templates', function buildTemplates() {
//   var jadeTemplates = {};
//
//   return gulp.src('./app/views/**/*.jade')
//     .pipe(jade({
//       locals: jadeTemplates
//     }))
//     .pipe(gulp.dest('./public'))
//     .on('end', browserSync.reload)
// })
//
// gulp.task('serve', function serve(done) {
//   browserSync.init({
//     server: {
//       baseDir: './public'
//     },
//     port: 3000,
//
//     open: !!$.util.env.open,
//     offline: true,
//     notify: false
//   }, done)
// })
//
// gulp.task('images', function images() {
//   return gulp.src('./app/assets/images/**/*')
//     .pipe(gulp.dest('./public/images'))
// })
//
// // gulp.task('fonts', function images () {
// //   return gulp.src('./src/fonts/**/*')
// //     .pipe(gulp.dest('./public/fonts'))
// // })
//
// gulp.task('watch', function watch () {
//   options.watch = true
//
//   gulp.start([
//     'serve',
//     'sass',
//     'templates',
//     'js:libs',
//     'js',
//     'images'
//     // 'fonts'
//   ], function () {
//     // stream CSS to browser so it doesn't need to reload
//     gulp.watch('./app/assets/stylesheets/scss/**/*.scss', ['sass'])
//
//     // reload entire browser
//     gulp.watch('./app/views/layout.jade', ['templates'])
//   })
// })
//
// gulp.task('default', ['watch'])
//
// /* *******************************
//  * Build/deploy production tasks
//  *********************************/
// gulp.task('build', function (cb) {
//   // garauntee minify flag is set
//   options.minify = true
//
//   gulp.start([
//     'sass',
//     'templates',
//     'js:libs',
//     'js',
//     'images'
//   ], cb)
// })
