
webpack = require('webpack')
path = require('path')

module.exports =

    entry: './src/coffee/main.coffee'

    output:
        filename: './dest/assets/js/bundle.js'

    module: loaders: [
        { test: /\.coffee$/, loader: 'coffee-loader' }
        { test: /\.html/,    loader: "underscore-template-loader" }
    ]

    resolve:
        root: [ path.join(__dirname, 'bower_components') ]
        moduleDirectories: [ 'bower_components' ]
        extensions: [ '', '.js', '.coffee' ]

    plugins: [
        new (webpack.ResolverPlugin)(new (webpack.ResolverPlugin.DirectoryDescriptionFilePlugin)('bower.json', [ 'main' ]))
    ]
