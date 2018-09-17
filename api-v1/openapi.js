'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const openapi = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'openapi.yaml'), 'utf8'));

module.exports = openapi;
