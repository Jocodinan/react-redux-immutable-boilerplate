import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';
import babelify from 'babelify';
import browserSync from 'browser-sync';

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const dependencies = [
  'react',
  'react-dom'
];
// keep a count of the times a task refires
let scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', () => {
  bundleApp(false);
});

gulp.task('deploy', () => {
  bundleApp(true);
});

gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src([
    './src/assets/styles/main.scss'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(gulp.dest('.tmp/styles'));

    gulp.src([
      'public/css/main.css'
    ])
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['styles', 'scripts'], () => {
  browserSync({
    notify: false,
    server: ['.tmp', './public'],
    port: 3000
  });
  gulp.watch(['./index.html'], [reload]);
  gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['scripts', reload]);
  gulp.watch(['./src/**/*.scss'], ['styles', reload]);
});

gulp.task('html', () => {
  return gulp.src('build/index.html')
    .pipe(gulp.dest('dist/'));
})

gulp.task('images', () => {
  gulp.src('public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
});

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('build', ['apply-prod-environment', 'html', 'images', 'styles'], () => {
  gulp.src([
    'build/static/**/*.js'
  ])
  .pipe(gulp.dest('dist/static/'));

  gulp.src([
    'public/css/fonts/**/*.*'
  ])
  .pipe(gulp.dest('dist/css/fonts/'));

  gulp.src([
    'build/service-worker.js',
    'build/manifest.json',
    'build/favicon.ico',
    'build/asset-manifest.json',
  ])
  .pipe(gulp.dest('dist/'));
});

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
  scriptsCount++;
  var appBundler = browserify({
      entries: './src/index.js',
      debug: true
    })
    if (!isProduction && scriptsCount === 1){
      browserify({
      require: dependencies,
      debug: true
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest('./public/js/'));
    }
    if (!isProduction){
      dependencies.forEach(function(dep){
        appBundler.external(dep);
      })
    }

    appBundler
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .on('error',gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js/'));
}