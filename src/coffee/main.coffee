"use strict"

$ = require 'jquery'
_ = require 'underscore'
BaseApp = require './classes/BaseApp'
# Anchor = require './classes/Anchor'
# Tapstyle = require './classes/TapStyle'

class Main extends BaseApp

    constructor: (@instance) ->
        super()
        @setFrameRate 30


    onScroll: () =>
        super()
        console.log @getScroll().top

$ new Main
