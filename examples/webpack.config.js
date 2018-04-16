const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    devtool: 'source-map',
    entry:  {
        app : path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'example.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    plugins: []
};

module.exports = config;