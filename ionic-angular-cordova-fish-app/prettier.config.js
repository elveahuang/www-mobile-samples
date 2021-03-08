module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    overrides: [
        {
            files: '*.component.html',
            options: {
                parser: 'angular',
            },
        },
        {
            files: '*.html',
            options: {
                parser: 'html',
            },
        },
    ],
};
