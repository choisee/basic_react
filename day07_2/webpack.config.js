const path = require('path');
const ReactReferenceWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'day07_2',
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: './client.jsx',
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {browsers: ['last 2 chrome versions']},
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: ['react-refresh/babel'],
            },
            exclude: path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [
        new ReactReferenceWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist',
    },
    devServer: {
        devMiddleware: { publicPath: '/dist'},
        static: { directory: path.resolve(__dirname)},
        hot: true
    }
}

