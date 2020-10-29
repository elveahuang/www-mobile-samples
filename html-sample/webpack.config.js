const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => ({
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx)x?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }, {
                test: /\.(css|scss|sass)x?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html')
        }),
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: __dirname,
        overlay: true
    }
})
