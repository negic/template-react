"use strict"

gulp = require('gulp')
$ = require('gulp-load-plugins')()
runSequence = require('run-sequence')
{config} = require './src/_config/config.coffee'

### ============================================================================================
    - 設定
============================================================================================ ###
p =
    d: config.develop.path
    p: config.dest.path
    r: config.release.path


### ============================================================================================
    - HTML系記述
============================================================================================ ###
gulp.task 'jade', () ->
    gulp.src [ "#{p.d.jade}/**/*.jade", "!#{p.d.jade}/_include/**.jade" ]
        .pipe $.changed p.p.root, extension: '.html'
        .pipe $.plumber()
        .pipe $.jade pretty: true, data: config.common
        .pipe gulp.dest p.p.root

gulp.task 'jade-all-compile', () ->
    gulp.src [ "#{p.d.jade}/**/*.jade", "!#{p.d.jade}/_include/**.jade" ]
        .pipe $.plumber()
        .pipe $.jade pretty: true, data: config.common
        .pipe gulp.dest p.p.root

gulp.task 'minify-html', ->
    gulp.src "#{p.p.root}/**/*.html"
        .pipe $.minifyHtml
            conditionals: true
            spare: true
            quotes: true
        .pipe gulp.dest p.r.root


### ============================================================================================
    - JS系記述
============================================================================================ ###
gulp.task 'coffee', ->
    gulp.src "#{p.d.coffee}/**/*.coffee"
        .pipe $.plumber()
        .pipe $.coffee()
        .pipe gulp.dest p.d.js

gulp.task 'webpack', ->
    gulp.src ''
        .pipe $.webpack require('./webpack.config.coffee')
        .pipe gulp.dest ''

gulp.task 'jsmin', ->
    gulp.src "#{p.p.js}/bundle.js"
        .pipe $.uglify
            mangle: false
            preserveComments: 'some' # licenseコメントを残す
        .pipe gulp.dest p.r.js

### ============================================================================================
    - CSS系記述
============================================================================================ ###
gulp.task 'compass', ->
    gulp.src [ "#{p.d.sass}/**/*.scss" ]
        .pipe $.changed p.d.css
        .pipe $.plumber()
        .pipe $.compass
            config_file: 'sass.config.rb'
            sass: p.d.sass
            css: p.d.css
            image: p.d.image
        .pipe $.autoprefixer 'last 2 version'
        .pipe $.csscomb()
        .pipe gulp.dest p.d.css

gulp.task 'cssmin', ->
    gulp.src [ "#{p.p.css}/app.css" ]
        .pipe $.minifyCss()
        .pipe gulp.dest p.r.css

gulp.task 'cmq', ->
    gulp.src [ "#{p.d.css}/app.css" ]
        .pipe $.combineMediaQueries
            log: false
        .pipe gulp.dest p.p.css


### ============================================================================================
    - その他
============================================================================================ ###
gulp.task 'imagemin', ->
    gulp.src p.d.image + '/{,**/}*.{png,jpg,gif}'
        .pipe $.imagemin()
        .pipe gulp.dest p.p.image

gulp.task 'clean-release', ->
    gulp.src [ p.r.root ], read: false
        .pipe $.clean()

gulp.task 'ftp', ->
    gulp.src [ "#{p.r.root}/**/*" ]
        .pipe $.ftp config.common.ftp

gulp.task 'copy', ->
    gulp.src "#{p.d.js}/lib/modernizr-2.7.1.min.js"
        .pipe gulp.dest "#{p.p.js}/lib/"

    gulp.src "#{p.d.root}/assets/font/**/*"
        .pipe gulp.dest "#{p.p.root}/assets/font/"


### ============================================================================================
    - タスク
============================================================================================ ###
gulp.task 'release', ->
    runSequence 'clean-release',  'jsmin', 'cssmin', 'imagemin', 'copy', 'minify-html'

gulp.task 'deploy', ->
    runSequence 'ftp'

gulp.task 'watch', ->

    console.log "\n------- watch start -------"
    log = -> console.log "\n------- file change -------"

    gulp.watch "#{p.d.root}/**/*.jade", (event) ->
        log()
        gulp.run 'jade'

    gulp.watch [ "#{p.d.jade}/_include/**/*.jade" ], (event) ->
        log()
        gulp.run 'jade-all-compile'

    gulp.watch [ "#{p.d.coffee}/**/*.coffee", "#{p.d.jade}/_template/**/*.html" ], (event) ->
        log()
        runSequence 'coffee', 'webpack'

    gulp.watch "#{p.d.sass}/**/*.scss", (event) ->
        log()
        runSequence 'compass', 'cmq'


gulp.task 'r', [ 'release' ]
gulp.task 'd', [ 'deploy' ]
gulp.task 'default', [ 'watch' ]
