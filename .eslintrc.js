module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'globals': {
    'wx': true,
    'App': true,
    'Page': true,
    'getApp': true,
    'Component': true,
    'WeixinJSBridge': true,
    'getCurrentPages': true
  },
  'parser': 'babel-eslint',
  'extends': ['eslint:recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    },
    'sourceType': 'module'
  },
  'rules': {
    'no-unused-vars': [
      1
    ],
    'no-console': [
      0
    ],
    'no-empty': [
      0
    ],
    'indent': [
      2,
      2,
      { 'SwitchCase': 1, 'MemberExpression': 1 }
    ],
    'linebreak-style': [
      0,
      'unix'
    ],
    'quotes': [
      0,
      'single'
    ],
    'semi': [
      0,
      'always'
    ]
  }
};
