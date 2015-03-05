do ->
    class app.MovingState

        defaultOptions:
            el: window
            delay: 500
            event: 'scroll'

        constructor: (opt) ->
            @opt = $.extend {}, @defaultOptions, opt
            $(@opt.el).on(@opt.event, @onMoving)

        state: 0
        onMoving: (events) =>
            @state = if @state == 0 then 1 else if @state == 1 then 2 else @state

            if @state == 1
                @opt.start?()

            if @timeId
                @opt.move?()
                clearTimeout @timeId

            @timeId = setTimeout =>
                @state = 0
                @opt.ended?()
            , @opt.delay
