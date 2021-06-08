module.exports = {
    root: true,
    extends: ['react-app', 'prettier'],
    ignorePatterns: ['*/node_modules'],
    rules: {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
    },
};
