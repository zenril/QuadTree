const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
    plugins: [new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['examples'] }
      })]
};

module.exports = config;