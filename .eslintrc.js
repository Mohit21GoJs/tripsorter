module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/resolver': { 'babel-module': {} },
  },
  plugins: ['import'],
  rules: {
    'class-methods-use-this': 'off',
  },
  extends: 'airbnb-base',
};
