class Singleton

    @_instance: null

    @getInstance: ->
        @_instance or= new @( arguments... )

module.exports = Singleton
