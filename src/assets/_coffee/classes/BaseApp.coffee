do ->
    class app.BaseApp

        fps: 30

        isScroll: false

        constructor: () ->
            @frameRate = 1000 / @fps

            $(window)
                .on('resize', @onResize)

            new app.MovingState
                event: 'scroll'
                delay: 50
                start: =>
                    @isScroll = true
                    @onScroll()
                ended: =>
                    @isScroll = false

            @onResize()


        getFrameRate: =>
            return @frameRate

        setFrameRate: (fps) =>
            @fps = fps
            @frameRate = 1000 / @fps


        getWidth:  =>
            return @width

        getHeight: =>
            return @height


        onResize: =>
            @width  = $(window).width()
            @height = $(window).height()

        onScroll: () =>
            if !@isScroll then return false
            setTimeout @onScroll, @frameRate
