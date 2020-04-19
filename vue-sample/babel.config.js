module.exports = {
    presets : [
        '@babel/preset-env',
        '@babel/preset-typescript'
    ],
    plugins : [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-object-rest-spread',
        ["@babel/plugin-transform-runtime", {
            "corejs" : false
        }],
        ['@babel/plugin-proposal-decorators', {
            'legacy' : true
        }],
        ['@babel/plugin-proposal-class-properties', {
            'loose' : true
        }]
    ]
};
