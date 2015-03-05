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
            sass:   './src/assets/_sass'
            coffee: './src/assets/_coffee'
            css:    './src/assets/css'
            js:     './src/assets/js'
            image:  './src/assets/img'

        debug: true


    production:
        path:
            root:   './_dist'
            css:    './_dist/assets/css'
            js:     './_dist/assets/js'
            image:  './_dist/assets/img'

        debug: false
