
webpack = require('webpack')
path = require('path')

module.exports =

    entry:
        main: './src/jsx/main.jsx'

    output:
        filename: './dest/assets/js/bundle.js'

    module:
        loaders: [
            { test: /\.coffee$/, loader: 'coffee-loader' }
            { test: /\.html/,    loader: "underscore-template-loader" }
            { test: /\.jsx/,     loader: 'jsx-loader?harmony' }
        ]

    resolve:
        root: [ path.join(__dirname, 'bower_components') ]
        moduleDirectories: [ 'bower_components' ]
        extensions: [ '', '.js', '.coffee', '.jsx' ]

    plugins: [
        new (webpack.ResolverPlugin)(new (webpack.ResolverPlugin.DirectoryDescriptionFilePlugin)('bower.json', [ 'main' ]))
    ]
