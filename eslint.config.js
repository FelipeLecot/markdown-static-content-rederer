module.exports = [
  {
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },

    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      '@typescript-eslint/no-explicit-any': 'error',
    },

    ignores: ['public/bundle.js'],
  },
  {
    files: ['*.ts', '*.tsx'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
];