module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/resolver': { 'babel-module': {} },
  },
  plugins: [
    'import',
  ],
};
