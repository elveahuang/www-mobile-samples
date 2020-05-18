const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const {getLoader, getLoaders, loaderByName} = require("@craco/craco");

module.exports = {
    babel : {
        plugins : [
            ["@babel/plugin-proposal-decorators", {legacy : true}],
            ['@babel/plugin-proposal-class-properties', {loose : true}]
        ]
    },
    webpack : {
        alias : {
            '@' : path.join(path.resolve(__dirname, './src/')),
            '@common' : path.join(path.resolve(__dirname, '../common/src/')),
        },
        configure : (webpackConfig, {env, paths}) => {
            const {hasFoundAny, matches} = getLoaders(webpackConfig, loaderByName("babel-loader"));
            if (hasFoundAny) {
                matches.forEach(x => {
                    if (x.loader.include) {
                        x.loader.include = [
                            path.join(path.resolve(__dirname, './src/')),
                            path.join(path.resolve(__dirname, '../common/src/'))
                        ]
                    }
                });
            }
            webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
            return webpackConfig;
        }
    }
};
