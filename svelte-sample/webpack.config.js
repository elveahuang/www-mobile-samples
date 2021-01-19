const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
                exclude: /node_modules/,
                loader: 'svelte-loader',
            },
            {
                test: /\.(ts|tsx)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.(ts|tsx)x?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.(css|scss|sass)x?$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: __dirname,
        overlay: true,
    },
});
