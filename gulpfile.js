/*
 * Defined paths
 */
var sources = {
  bower:       'bower.json',
  html:        [
    'app/**/*.hbs',
    '!app/**/_*.hbs'
  ],
  images:      [
    'app/relation/assets/images/**/*.jpg',
    'app/relation/assets/images/**/*.png'
  ],
  javascripts: 'app/relation/assets/javascripts/**/*.js',
  sass:        'app/relation/assets/stylesheets/**/*.scss'
};

var vendors = {
  javascripts: [
    'html5shiv/dist/html5shiv.min.js',
    'jquery/dist/jquery.min.js',
    'jquery-single-page-nav/jquery.singlePageNav.min.js',
    'slick-carousel/slick/slick.min.js',
    'urijs/src/URI.min.js'
  ],
  stylesheets: [
    'sanitize-css/sanitize.css',
    'font-awesome/css/font-awesome.min.css',
    'slick-carousel/slick/slick.css',
    'slick-carousel/slick/slick-theme.css'
  ],
  fonts: [
    'font-awesome/fonts/*',
    'slick-carousel/slick/fonts/*'
  ]
};


var pkg = require('./package.json');

/*
 * Load modules
 */
var bower       = require('bower');
var del         = require('del');
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var ghPages     = require('gulp-gh-pages');
var handlebars  = require('gulp-compile-handlebars');
var htmlhint    = require("gulp-htmlhint");
var jscs        = require('gulp-jscs');
var jshint      = require('gulp-jshint');
var minify      = require('gulp-minify-html');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var replace     = require('gulp-replace');
var sass        = require('gulp-sass');
var runSequence = require('run-sequence');
var uglify      = require('gulp-uglify');
var webserver   = require('gulp-webserver');

/*
 * Main Tasks
 */
gulp.task('default', function(done) {
  return runSequence(
    ['clean'],
    ['compile:lib', 'compile:js', 'compile:sass', 'compile:html', 'compile:image'],
    ['watch', 'serve'],
    done
  );
});

gulp.task('build', function(done) {
  return runSequence(
    ['clean'],
    ['compile:lib', 'compile:js', 'compile:sass', 'compile:html', 'compile:image'],
    done
  );
});


gulp.task('deploy', function(done) {
  return runSequence(
    ['clean'],
    ['compile:lib', 'compile:js', 'compile:sass', 'compile:html:ghPages', 'compile:image'],
    ['deploy:ghPages'],
    done
  );
});


gulp.task('clean', function(done) {
  return del([
    'public/relation/*',
    'public/vendor/*',
    'public/*.html'
  ], done);
});

gulp.task ('watch', function() {
  gulp.watch(sources.javascripts, ['compile:js']);
  gulp.watch(sources.sass,        ['compile:sass']);
  gulp.watch(['app/**/*.hbs'],    ['compile:html']);
});

gulp.task('serve', function() {
  return gulp.src('public')
    .pipe(webserver({ livereload: true }));
});


/*
 * Helper Tasks
 */
gulp.task('compile:lib', function() {
  return bower.commands.install().on('end', function() {
    var scripts = vendors.javascripts.map(function(e) {return "vendor/" + e; });
    gulp.src(scripts)
      .pipe(gulp.dest('public/vendor/javascripts'));

    var sheets = vendors.stylesheets.map(function(e) {return "vendor/" + e; });
    gulp.src(sheets)
      .pipe(gulp.dest('public/vendor/stylesheets'));

    var fonts = vendors.fonts.map(function(e) {return "vendor/" + e; });
    gulp.src(fonts)
      .pipe(gulp.dest('public/vendor/fonts'));
  });
});

gulp.task('compile:js', ['compile:lib'], function() {
  return gulp.src('app/relation/assets/javascripts/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/relation/assets/javascripts'));
});

gulp.task('compile:sass', ['compile:lib'], function() {
  return gulp.src("app/relation/assets/stylesheets/application.scss")
    .pipe(plumber())
    .pipe(sass({ style : 'expanded', outputStyle: 'compressed' }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/relation/assets/stylesheets'));
});

gulp.task("compile:html", function() {
  var templateData = { BASE_HREF: '/', VERSION: pkg.version };
  var options = {
    ignorePartials: true, batch : ['./app/relation/partials']
  };

  gulp.src(sources.html)
      .pipe(handlebars(templateData, options))
      .pipe(plumber())
      .pipe(minify({ conditionals: true }))
      .pipe(rename({ extname: '.html' }))
      .pipe(gulp.dest('public'));
});

gulp.task('compile:html:ghPages', function() {
  var templateData = { BASE_HREF: '/activefollow-pages/', VERSION: pkg.version };
  var options = {
    ignorePartials: true, batch : ['./app/relation/partials']
  };

  return gulp.src(sources.html)
             .pipe(handlebars(templateData, options))
             .pipe(plumber())
             .pipe(minify({ conditionals: true }))
             .pipe(rename({ extname: '.html' }))
             .pipe(gulp.dest('public'));
});

gulp.task('compile:image', function() {
  return gulp.src(sources.images, { base: 'app' })
    .pipe(gulp.dest('public'));
});


gulp.task('deploy:ghPages', function() {
  gulp.src('public/robots.txt.gh-pages')
    .pipe(rename('robots.txt'))
    .pipe(gulp.dest('./public'));

  return gulp.src('./public/**/*').pipe(ghPages());
});


gulp.task('lint:html', function() {
  return gulp.src(sources.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('lint:js', function () {
  return gulp.src(sources.javascripts)
    .pipe(jscs())
    .pipe(jshint({ lookup: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
