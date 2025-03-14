module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    plugins: ['@typescript-eslint', 'import'],
    resolve: {
        alias: {
            app: '/src/app',
            entities: '/src/entities',
            features: '/src/features',
            pages: '/src/pages',
            shared: '/src/shared',
            widgets: '/src/widgets',
        },
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['src', './src'],
                    ['app', './src/app'],
                    ['entities', './src/entities'],
                    ['features', './src/features'],
                    ['pages', './src/pages'],
                    ['shared', './src/shared'],
                    ['widgets', './src/widgets'],
                ],
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            },
        },
    },
    rules: {
        'import/no-unresolved': 'error',
    },
};