BASE_URL = 'http://example.com/'

module.exports = exports =

    common:
        BASE_URL: BASE_URL
        BASE_TITLE: 'no title'
        BASE_DESCRIPTION: ''
        BASE_KEYWORD: ''

        analytics:
            id: 'UA-1'
            domain: 'example.com'

        lang: 'ja'

        twitter:
            tweet: encodeURIComponent "no share text #{BASE_URL} #negic"
            lang: 'ja'

        google_plus_one:
            lang: 'ja'

        fb:
            lang: 'ja_JP'
            app_id: 1

        og:
            url: BASE_URL
            title: ''
            site_name: ''
            description: ''
            image: "#{BASE_URL}assets/img/og.jpg"
            locale:'ja_JP'
            type: 'website'

    develop:
        path:
            root:   './src'
            jade:   './src/jade'
            sass:   './src/sass'
            coffee: './src/coffee'
            css:    './src/css'
            js:     './src/js'
            img:  './src/img'
        debug: true

    dest:
        path:
            root:   './dest'
            css:    './dest/assets/css'
            js:     './dest/assets/js'
            img:  './dest/assets/img'
        debug: true

    release:
        path:
            root:   './release'
            css:    './release/assets/css'
            js:     './release/assets/js'
            img:  './release/assets/img'
        debug: false
