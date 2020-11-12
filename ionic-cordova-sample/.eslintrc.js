module.exports = {
    root : true,
    env : {
        browser : true,
        node : true,
        es6 : true,
    },
    extends : [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/@typescript-eslint",
    ],
    plugins : ["@typescript-eslint", "@angular-eslint", "prettier"],
    parser : "@typescript-eslint/parser",
    parserOptions : {
        ecmaVersion : 2020,
        project : "tsconfig.json",
        extraFileExtensions : ["ts", "js", "html"],
        sourceType : "module",
    },
    rules : {
        "@typescript-eslint/no-floating-promises" : "off",
        '@angular-eslint/directive-selector' : [
            'error',
            {type : 'attribute', prefix : 'app', style : 'camelCase'},
        ],
        '@angular-eslint/component-selector' : [
            'error',
            {type : 'element', prefix : 'app', style : 'kebab-case'}
        ],
        "@angular-eslint/component-class-suffix" : ["error", {suffixes : ["View", "Page", "Component"]}],
    },
    overrides : [
        {
            files : ["*.html"],
            extends : ["plugin:@angular-eslint/template/recommended"],
        },
    ],
};
