module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: '@mate-academy/eslint-config',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
  ignorePatterns: ['/build'],
};
