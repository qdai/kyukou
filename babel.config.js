'use strict';

const config = {
  overrides: [
    {
      sourceType: 'unambiguous',
      test: 'node_modules'
    }
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};

module.exports = config;
