import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import nextVitals from 'eslint-config-next/core-web-vitals';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import architecture from './rules/architecture.mjs';

/** React 검사와 공통 포맷 규칙을 서비스 앱에서 독립 실행한다. */
export default defineConfig([
  globalIgnores([
    'out/**',
    'next-env.d.ts',
    '.next/**',
    'coverage/**',
    'node_modules/**',
  ]),
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextVitals,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { architecture },
    rules: { 'architecture/boundaries': 'error' },
  },
  {
    files: ['src/**/*.tsx'],
    ignores: ['**/*.test.tsx'],
    plugins: { architecture },
    rules: { 'architecture/components': 'error' },
  },
  prettier,
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let', 'singleline-var'],
          next: ['singleline-const', 'singleline-let', 'singleline-var'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'multiline-const',
            'multiline-let',
            'multiline-var',
            'multiline-expression',
            'block-like',
            'return',
          ],
        },
        {
          blankLine: 'always',
          prev: ['multiline-expression', 'block-like'],
          next: '*',
        },
      ],
    },
  },
]);
