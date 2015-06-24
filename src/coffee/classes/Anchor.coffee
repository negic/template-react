$ = require 'jquery'

class Anchor

    defaults:
        delegate: ''
        speed: 500
        extra: 0
        easing: 'swing'

    constructor: (opt) ->
        @speed = if !opt.className then @defaults.speed
        @extra = if !opt.className then @defaults.extra
        @easing = if !opt.className then @defaults.easing

        $('#wrapper').on 'click', opt.delegate, @eventHandler


    eventHandler: (e) =>
        e.preventDefault()

        $('html, body')
            .stop true, false
            .animate
                scrollTop: $($(e.target).attr('href')).offset().top + @extra
            , @speed, @easing

module.exports = Anchor
