'use strict';

const datauri = require('datauri');
const sass = require('node-sass');

module.exports = {
  'inline-file($path)' (path) {
    const uri = datauri.sync(path.getValue());
    return new sass.types.String(uri);
  }
};
