const path = require('path');
const fs = require('fs');
const CracoExtendScope = require('@dvhb/craco-extend-scope');
const CracoBabelLoader = require('craco-babel-loader');
const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');
const config = require('./config');
//
const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': config.primaryColor,
                },
                babelPluginImportOptions: {
                    libraryDirectory: 'es',
                },
            },
        },
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
