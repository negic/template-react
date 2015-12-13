
"use strict"

const webpack = require('webpack');
const path = require('path');
const config = require('./config');


module.exports = {

    production: {

        entry: {
            main: config.develop.path.jsx + "/main.jsx"
        },

        output: {
            filename: config.production.path.js + "/bundle.js"
        },

        module: {
            loaders: [
                { test: /\.coffee$/, loader: 'coffee-loader'},
                { test: /\.html/, loader: "underscore-template-loader" },
                { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
                { test: /\.jsx/, loader: 'jsx-loader?harmony' }
            ]
        },

        resolve: {
            root: [path.join(__dirname, 'bower_components')],
            moduleDirectories: ['bower_components'],
            extensions: ['', '.js', '.jsx', '.coffee']
        },

        plugins: [
            new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                mangle: false,
                preserveComments: 'some' // licenseコメントを残す
            }),
            new webpack.DefinePlugin({
                DEBUG: config.production.debug,
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            })
        ]
    },


    develop: {

        entry: {
            main: config.develop.path.jsx + "/main.jsx"
        },

        output: {
            filename: config.dest.path.js + "/bundle.js"
        },

        module: {
            loaders: [
                { test: /\.coffee$/, loader: 'coffee-loader'},
                { test: /\.html/, loader: "underscore-template-loader" },
                { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
                { test: /\.jsx/, loader: 'jsx-loader?harmony' }
            ]
        },

        resolve: {
            root: [path.join(__dirname, 'bower_components')],
            moduleDirectories: ['bower_components'],
            extensions: ['', '.js', '.jsx', '.coffee']
        },

        plugins: [
            new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),

            new webpack.DefinePlugin({
                DEBUG: config.develop.debug
            })
        ]

    }

};
