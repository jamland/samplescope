const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    // 'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    '@typescript-eslint',
    // 'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        '~': path.resolve(__dirname, 'src/renderer'),
        '@modules': path.resolve(__dirname, 'src/modules/'),
        '@components': path.resolve(__dirname, 'src/renderer/components/'),
        '@hooks': path.resolve(__dirname, 'src/renderer/hooks/'),
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    // semi: [2, "always"],
    // "space-before-function-paren": 0
    // "comma-dangle": 1
  },
  overrides: [
    {
      // prevenet eslint yell on importing TS types as unsused variables
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-unused-vars': ['off'],
        'no-undef': ['off'],
      },
    },
  ],
};
