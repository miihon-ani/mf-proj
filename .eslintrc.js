module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['vue'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/vue'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-unused-vars': 'off',
    'vue/valid-v-for': 'off',
    'vue/no-multi-spaces': ['error', { ignoreProperties: false }],
    'no-multi-spaces': 'error',
    eqeqeq: ['error', 'smart'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'block-spacing': ['error', 'always'],
    'comma-spacing': 'error',
    'computed-property-spacing': 'error',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'minimum'
      }
    ],
    'func-call-spacing': ['error', 'never'],
    'no-spaced-func': 'error',
    'space-infix-ops': ['error', { int32Hint: false }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+']
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true
        }
      }
    ],
    'no-console': 'off',
    'space-in-parens': ['error', 'never'],
    'no-var': 'error',
    'space-before-function-paren': 'off',
    'space-before-blocks': [
      'error',
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always'
      }
    ],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'no-lonely-if': 'error',
    'no-trailing-spaces': 'error',
    'semi-spacing': 'error',
    'keyword-spacing': 'error',
    'arrow-parens': 'off'
  }
};
