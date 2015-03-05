do ->
    class app.Main

        instance = null

        class PrivateClass extends app.BaseApp

            constructor: () ->
                super()
                @setFrameRate 30


        @get: () ->
            instance ?= new PrivateClass()

    $ app.Main.get
