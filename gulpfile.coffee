gulp = require('gulp')
$ = require('gulp-load-plugins')()
runSequence = require('run-sequence')

{config} = require './src/_config/config.coffee'

### ============================================================================================
    - 設定
============================================================================================ ###
p =
    dev: config.develop.path
    prd: config.production.path


concatFiles =
    coffee: [
        p.dev.coffee + '/namespace.coffee'
        p.dev.coffee + '/classes/BaseApp.coffee'
        p.dev.coffee + '/main.coffee'
    ]
    release: [
        p.dev.js + '/lib/jquery-2.1.1.min.js'
        p.dev.js + '/lib/swfobject.js'
        p.dev.js + '/lib/underscore-min.js'
        p.dev.js + '/dev.js'
    ]


### ============================================================================================
    - HTML系記述
============================================================================================ ###
gulp.task 'jade', ->
    gulp.src [ p.dev.root + '/**/*.jade', "!#{p.dev.root}/_include/**.jade" ]
        .pipe $.plumber()
        .pipe $.jade
            pretty: true
            data: config.common #config.getData(config.develop)
        .pipe gulp.dest(p.dev.root)

gulp.task 'useref', ->
    assets = $.useref.assets()

    gulp.src p.dev.root + '/**/*.html'
        .pipe assets
        .pipe assets.restore()
        .pipe $.useref()
        .pipe gulp.dest(p.prd.root)

gulp.task 'minify-html', ->
    gulp.src  "#{p.prd.root}/**/*.html"
        .pipe $.minifyHtml
            conditionals: true
            spare: true
            quotes: true
        .pipe gulp.dest(p.prd.root)


### ============================================================================================
    - JS系記述
============================================================================================ ###
gulp.task 'coffee-concat', ->
    gulp.src concatFiles.coffee
        .pipe $.concat('dev.coffee')
        .pipe gulp.dest(p.dev.coffee)

gulp.task 'coffee', ->
    gulp.src p.dev.coffee + '/dev.coffee'
        .pipe $.plumber()
        .pipe $.coffee()
        .pipe gulp.dest(p.dev.js)

gulp.task 'release-concat', ->
    gulp.src concatFiles.release
        .pipe $.concat('app.js')
        .pipe gulp.dest(p.dev.js)

gulp.task 'jsmin', ->
    gulp.src p.dev.js + '/app.js'
        .pipe $.uglify
            preserveComments: 'some'
        .pipe gulp.dest(p.prd.js)


### ============================================================================================
    - CSS系記述
============================================================================================ ###
gulp.task 'compass', ->
    gulp.src [ p.dev.sass + '/**/*.scss' ]
        .pipe $.plumber()
        .pipe $.compass
            config_file: 'config.rb'
            sass: p.dev.sass
            css: p.dev.css
            image: p.dev.image
        .pipe $.autoprefixer('last 2 version')
        .pipe $.csscomb()
        .pipe gulp.dest(p.dev.css)

gulp.task 'cssmin', ->
    gulp.src [ p.dev.css + '/app.css' ]
        .pipe $.minifyCss()
        .pipe gulp.dest(p.prd.css)

gulp.task 'cmq', ->
    gulp.src [ "#{p.dev.css}/app.css" ]
        .pipe $.combineMediaQueries
            log: false
        .pipe gulp.dest p.dev.css


### ============================================================================================
    - その他
============================================================================================ ###
gulp.task 'imagemin', ->
    gulp.src p.dev.image + '/{,**/}*.{png,jpg,gif}'
        .pipe $.imagemin()
        .pipe gulp.dest(p.prd.image)

gulp.task 'clean-release', ->
    gulp.src [ p.prd.root ], read: false
        .pipe $.clean()

gulp.task 'ftp', ->
    gulp.src p.prd.root + '/**/*'
        .pipe $.ftp
            host: ''
            user: ''
            pass: ''
            remotePath: ''


### ============================================================================================
    - タスク
============================================================================================ ###
gulp.task 'release', ->
    runSequence 'clean-release', 'release-concat', 'jsmin', 'cssmin', 'imagemin', 'useref', 'minify-html'

gulp.task 'deploy', ->
    runSequence 'ftp'

gulp.task 'watch', ->

    log = ->
        console.log "\n------- watch start -------"

    gulp.watch p.dev.root + '/**/*.jade', (event) ->
        log()
        gulp.run 'jade'

    gulp.watch [ p.dev.coffee + '/**/*.coffee', "!#{p.dev.coffee}/dev.coffee" ], (event) ->
        log()
        runSequence 'coffee-concat', 'coffee'

    gulp.watch p.dev.sass + '/**/*.scss', (event) ->
        log()
        runSequence 'compass', 'cmq'


gulp.task 'r', [ 'release' ]
gulp.task 'd', [ 'deploy' ]
gulp.task 'default', [ 'watch' ]