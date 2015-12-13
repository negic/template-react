
"use strict"

/**
 * 設定
 */
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require("browser-sync");
const runSequence = require('run-sequence');
const config = require('./config');
const webpackConfig = require('./webpack.config.js')

const dev = config.develop.path;    //開発用
const dst = config.dest.path;       //出力用
const prd = config.production.path; //公開用

var log = (txt) => {
    console.log("\n\n------- "+ txt +" -------");
};


/**
 * HTML系記述
 */
 var jadeCompile = (pretty, dest, data) => {
     gulp.src([ `${dev.jade}/**/*.jade`, `!${dev.jade}/_include/**.jade` ])
         .pipe($.changed(dest), { extension: '.html' })
         .pipe($.plumber())
         .pipe($.jade({ pretty: pretty, data: data }))
         .pipe(gulp.dest(dest));
 };

gulp.task('jade', () => {
    jadeCompile(true, dst.root, config.develop);
});

gulp.task('htmlmin', () => {
    jadeCompile(false, prd.root, config.production);
});


/**
 * JS系記述
 */
 var jsCompile = (config) => {
     gulp.src('')
         .pipe($.webpack(config))
         .pipe(gulp.dest(''))
 };

gulp.task('webpack', () => {
    jsCompile(webpackConfig.develop);
});

gulp.task('jsmin', () => {
    jsCompile(webpackConfig.production);
});


/**
 * CSS系記述
 */
gulp.task('sass', () => {
    gulp.src([ `${dev.sass}/**/*.scss` ])
        .pipe($.plumber())
        .pipe($.compass({
            config_file: 'sass.config.rb',
            sass: dev.sass,
            css: dst.css,
            image: dst.img
        }))
        .pipe($.autoprefixer('last 2 version'))
        // .pipe($.combineMediaQueries({ log: false }))
        .pipe($.csscomb())
        .pipe(gulp.dest(dst.css));
});

gulp.task('cssmin', () => {
    gulp.src([ `${dst.css}/*.css` ])
        .pipe($.minifyCss())
        .pipe(gulp.dest(prd.css));
});


/**
 * その他
 */
gulp.task('browsersync', () => {
    browserSync({
        server: {
            baseDir: dst.root,
            notify: false
        }
    });
});

gulp.task('imagemin', () => {
    gulp.src(`${dst.img}/{,**/}*.{png,jpg,gif}`)
        .pipe($.imagemin())
        .pipe(gulp.dest(prd.img));
});

gulp.task('clean-release', () => {
    gulp.src([ prd.root ], { read: false })
        .pipe($.clean());
});

gulp.task('copy', () => {

    gulp.src(`${dst.root}/assets/font/**/*`)
        .pipe(gulp.dest(`${prd.root}/assets/font/`));

    gulp.src(`${dst.root}/assets/video/**/*`)
        .pipe(gulp.dest(`${prd.root}/assets/video/`));

    gulp.src(`${dst.root}/assets/audio/**/*`)
        .pipe(gulp.dest(`${prd.root}/assets/audio/`));
});


/**
 * タスク
 */
gulp.task('release', () => {
    log('release file');

    runSequence( 'htmlmin', 'jsmin', 'cssmin', 'imagemin', 'copy');
});

gulp.task('deploy', () => {
    log('deploy');

    gulp.src([ `${prd.root}/**/*` ])
        .pipe($.ftp(config.ftp));
});


gulp.task('watch', () => {

    log("watch start");

    gulp.watch([ `${dev.jade}/**/*` ], () => {
        log('file change');
        gulp.run('jade');
    });

    gulp.watch([ `${dev.js}/**/*`, `${dev.jsx}/**/*`, `${dev.root}/_config/**/*` ], () => {
        log('file change');
        gulp.run('webpack');
    });

    gulp.watch(`${dev.sass}/**/*`, () => {
        log('file change');
        gulp.run('sass');
    });

    gulp.watch(`${dev.root}/**/*`, () => {
        browserSync.reload();   // ファイルに変更があれば同期しているブラウザをリロード
    });

});


gulp.task('r', [ 'release' ]);
gulp.task('d', [ 'deploy' ]);
gulp.task('default', [ 'watch', 'browsersync' ]);
