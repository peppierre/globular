'use strict';

var webpack = require('webpack');

var config = Object.create({
    entry: './src/index.js',
    output: {
        library: 'globular',
        libraryTarget: 'var'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
});
config.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
];

module.exports = config;
