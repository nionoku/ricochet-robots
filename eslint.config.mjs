// @ts-expect-error
import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import stylistic from '@stylistic/eslint-plugin';
import sonar from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
// @ts-expect-error
import promise from 'eslint-plugin-promise';
// eslint-disable-next-line import-x/no-unresolved
import compat from 'eslint-plugin-compat';

import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
const languageOptions = [
  {
    files: ['**/*.{mjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
const pluginJs = [

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'func-style': ['error', 'expression'],
    },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginTs = [
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    files: [
      '**/*.mjs',
      '**/*.ts',
      '**/*.vue',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginVue = [
  ...vue.configs['flat/strongly-recommended'],
  {
    files: ['**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
  ...defineConfigWithVueTs([
    vueTsConfigs.strictTypeChecked,
    vueTsConfigs.stylisticTypeChecked,
  ]),
  {
    files: ['**/*.vue'],
    rules: {},
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginImport = [
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
      ],
    },
    rules: { 'import-x/order': 'error' },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginStylistic = [
  stylistic.configs.recommended,
  {
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/object-curly-newline': ['error', {
        consistent: true,
        multiline: true,
      }],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
    },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginUnicorn = [
  unicorn.configs.recommended,
  {
    rules: {
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/relative-url-style': ['error', 'always'],
    },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginSonar = [
  sonar.configs.recommended,
  {
    rules: {
      'sonarjs/todo-tag': 'warn',
      'sonarjs/fixme-tag': 'warn',
      'sonarjs/deprecation': 'warn',
    },
  },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginPromise = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  promise.configs['flat/recommended'],
  { rules: {} },
];

/** @type {import('typescript-eslint').ConfigArray} */
const pluginCompat = [
  compat.configs['flat/recommended'],
  { rules: {} },
];

export default ts.config([
  ...pluginJs,
  ...pluginTs,
  ...pluginVue,
  ...languageOptions,

  ...pluginImport,
  ...pluginStylistic,
  ...pluginSonar,
  ...pluginUnicorn,
  ...pluginPromise,
  ...pluginCompat,

  // For some reason the @vue/eslint-config-typescript rewrites the rules for typescript-eslint.
  // Therefore, we redefine the rules for typescript-eslint here
  {
    files: [
      '**/*.mjs',
      '**/*.ts',
      '**/*.vue',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // ts strict rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: false,
          allowRegExp: false,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNumber: false,
          allowString: false,
        },
      ],
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
      // gts rules
      'eqeqeq': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'block-scoped-var': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-restricted-properties': [
        'error',
        {
          object: 'describe',
          property: 'only',
        },
        {
          object: 'it',
          property: 'only',
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-deprecated': ['warn'],
      '@typescript-eslint/ban-ts-comment': ['warn'],
    },
  },
]);
