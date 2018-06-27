const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
    devtool: 'source-map',
    mode: 'development',
    entry:  {
        app : path.resolve(__dirname, 'builder/src/app.js'),
        //twitch : path.resolve(__dirname, 'src/twitch.js'),
        // fly : path.resolve(__dirname, 'src/fly.js'),
        // quad : path.resolve(__dirname, 'src/index.js'),
        // oct : path.resolve(__dirname, 'src/oct.js')

    },
    output: {
        path: path.resolve(__dirname, 'builder/build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015", "stage-0" ,'env', 'react']
                },
                exclude: /node_modules/
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] }, 
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader?sourceMap=true']
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3090,
            server: { baseDir: ['examples/builder'] }
          })
    ]
};

module.exports = config;