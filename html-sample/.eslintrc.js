module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    env: {
        browser: true,
    },
};
