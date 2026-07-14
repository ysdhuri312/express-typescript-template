// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['src/**/*.{js,ts}'],
    ignores: ['dist', 'node_modules'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true, //{ allowDefaultProject: ['*.js'] },
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
  },
  {
    files: ['tests/**/*.{js,ts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.test.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
