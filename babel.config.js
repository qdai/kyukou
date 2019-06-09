'use strict';

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ]
};

module.exports = config;
