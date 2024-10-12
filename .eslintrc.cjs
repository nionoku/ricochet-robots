/* eslint-env node */
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  plugins: [
    'import',
    'sonarjs',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:sonarjs/recommended-legacy',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // project: './tsconfig.json',
    project: true,
    // projectService: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'arrow-parens': 'error',
  },
};
