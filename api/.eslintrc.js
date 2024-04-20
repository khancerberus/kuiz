module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/triple-slash-reference': 'off',
    'import/no-absolute-path': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/space-before-function-paren': 'off',
    'space-before-function-paren': 'off'
  }
}
