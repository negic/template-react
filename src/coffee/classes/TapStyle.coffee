$ = require 'jquery'

class TapStyle

    defaults:
        delegate: ''
        className: 'tap-style'
        el: '#wrapper'

    constructor: (opt) ->
        @className = if !opt.className then @defaults.className

        $(opt.el).on 'touchstart touchend', opt.delegate, @eventHandler


    eventHandler: (e) =>
        el = $(e.currentTarget)

        if e.type == 'touchstart'
            el.addClass @className
        else if e.type == 'touchend'
            el.removeClass @className


module.exports = TapStyle
