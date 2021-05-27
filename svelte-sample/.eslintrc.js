module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['prettier', 'svelte3', '@typescript-eslint'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
        },
    ],
    env: {
        browser: true,
        node: true,
    },
};
