'use strict';

const fs = require('fs');
const path = require('path');
const site = require('./lib/site');
const yaml = require('js-yaml');

const { info: { description, title } } = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'openapi.yaml'), 'utf8'));

module.exports = {
  api: {
    description,
    title
  },
  site
};
