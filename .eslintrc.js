module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'ignore'
    }],
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: true
    }],
    'arrow-body-style': ['off']
  }
};
