
"use strict"

const BASE_DIR = '';
const BASE_URL = 'http://hoge.com';
const BASE_TITLE = 'no title';
const BASE_DESCRIPTION = 'no description';
const BASE_KEYWORD = 'no keyword';


module.exports = {

    BASE_URL: BASE_URL,
    BASE_TITLE: BASE_TITLE,
    BASE_DESCRIPTION: BASE_DESCRIPTION,
    BASE_KEYWORD: BASE_KEYWORD,

    CHARSET: 'utf-8',
    LANG: 'ja',

    ANALYTICS: {
        id: 'UA-69412200-1',
        domain: BASE_URL
    },

    TWITTER: {
        tweet: `no share text ${BASE_URL} #hashtag`,
        lang: 'ja'
    },

    FB: {
        lang: 'ja_JP',
        app_id: 1
    },

    OG: {
        url: BASE_URL,
        title: BASE_TITLE,
        site_name: BASE_TITLE,
        description: BASE_DESCRIPTION,
        image: `${BASE_URL}/assets/img/og.jpg`,
        locale: 'ja_JP',
        type: 'website'
    }

};
