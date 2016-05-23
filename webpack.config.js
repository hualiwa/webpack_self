'use strict';
var webpack = require('webpack');
var path = require("path");
var fs = require("fs");
var srcDir = './src';
function getEntry(type,element) {
    var jsPath = path.resolve(srcDir, type);
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, element, item);
        }
    });
    return files;
};
module.exports = {
    output: {
        path: path.join(__dirname, '.'),  //打包,出的路径//打包后的名字
        filename: 'dist/js/entry.js'
    },

    cache: true,
    debug: true,
    devtool: 'sourcemap',
    entry: getEntry('js','js'),
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/src/css',
            'mixins': __dirname + '/src/image',
            'components': __dirname + '/src/js/'
        }
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel-loader'// transpiling compiling
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};
