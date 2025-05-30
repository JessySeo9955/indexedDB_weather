import js from '@eslint/js';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
    },
]);
