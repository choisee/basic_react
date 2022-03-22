const path = require('path');
const ReactReferenceWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'day07',
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



// redux
// useReducer를 배우면 redux와 비슷한 효과를 낼 수 있음
// context api를 배우면 redux를 안쓸 수 는 없다
// 소규모 앱에서는 redux를 쓰기보단, useReducer + context api 를 사용, redux를 흉내낼 수 있음
// 대규모 앱에서는 비동기 개발을 위해 redux 개발을 해야함 
