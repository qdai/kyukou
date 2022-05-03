'use strict';

const config = {
  plugins: ['@babel/plugin-transform-runtime'],
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]]
};

module.exports = config;
