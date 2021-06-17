const path = require('path');
const fs = require('fs');
const CracoAlias = require('craco-alias');
const CracoExtendScope = require('@dvhb/craco-extend-scope');
const CracoBabelLoader = require('craco-babel-loader');
const WebpackBar = require('webpackbar');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
//
const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    webpack: {
        plugins: [new CaseSensitivePathsPlugin(), new WebpackBar()],
        configure: (webpackConfig, { env }) => {
            console.log(`webpack configure env - ${env}`);
            if (env !== 'production') {
                console.log(`webpack configure set out put path - ${process.env.BUILD_PATH}`);
                webpackConfig.output.path = process.env.BUILD_PATH;
            }
            return webpackConfig;
        },
    },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
        console.log(`webpack devServer env - ${env}`);
        if (env !== 'production') {
            devServerConfig.writeToDisk = true;
            console.log(`webpack devServer writeToDisk enabled. `);
            console.log(devServerConfig);
        }
        return devServerConfig;
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                tsConfigPath: './tsconfig.base.json',
            },
        },
        {
            plugin: CracoExtendScope,
            options: {
                path: '../commons/src',
            },
        },
        {
            plugin: CracoBabelLoader,
            options: {
                includes: [resolvePackage('../commons/src')],
            },
        },
    ],
};
