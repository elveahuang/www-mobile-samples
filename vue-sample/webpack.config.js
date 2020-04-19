const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => ({
    entry : path.resolve(__dirname, './src/main.ts'),
    output : {
        path : path.join(__dirname, 'dist'),
        filename : '[name].js'
    },
    resolve : {
        alias : {
            'vue' : '@vue/runtime-dom'
        }
    },
    module : {
        rules : [
            {
                test : /\.vue$/,
                use : 'vue-loader'
            }, {
                test : /\.(ts|js)x?$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
            }, {
                test : /\.png$/,
                use : {
                    loader : 'url-loader',
                    options : {limit : 8192}
                }
            }, {
                test : /\.css$/,
                use : [
                    {
                        loader : MiniCssExtractPlugin.loader,
                        options : {hmr : !env.prod}
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins : [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename : '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : path.resolve(__dirname, './public/index.html')
        }),
    ],
    devServer : {
        inline : true,
        hot : true,
        stats : 'minimal',
        contentBase : __dirname,
        overlay : true
    }
})
