// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.{js,ts}'],
  ignores: ['dist', 'node_modules'],
  extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.js'],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'error',
    'no-constant-condition': 'error',
    curly: 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-redeclare': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'callback-return': 'warn',
    'handle-callback-err': 'error',
    'no-path-concat': 'error',
  },
});
