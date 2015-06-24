$ = require 'jquery'
Singleton = require './Singleton'
MovingState = require './MovingState'

class BaseApp extends Singleton

    fps: 30

    isScroll: false

    constructor: (@num) ->
        @frameRate = 1000 / @fps

        $(window).on 'resize', @onResize


        new MovingState
            event: 'scroll'
            delay: 50
            start: =>
                @isScroll = true
                @onScroll()
            ended: =>
                @isScroll = false

        @onResize()


    getFrameRate: =>
        return Math.floor @frameRate

    setFrameRate: (fps) =>
        @fps = fps
        @frameRate = 1000 / @fps

    getWidth:  =>
        return @width

    getHeight: =>
        return @height

    getScroll: =>
        return {
            top:  document.documentElement.scrollTop || document.body.scrollTop
            left: document.documentElement.scrollLeft || document.body.scrollLeft
        }

    onResize: =>
        @width  = document.documentElement.clientWidth || window.innerWidth
        @height = document.documentElement.clientHeight || window.innerHeight

    onScroll: () =>
        if !@isScroll then return false
        setTimeout @onScroll, @frameRate

module.exports = BaseApp
