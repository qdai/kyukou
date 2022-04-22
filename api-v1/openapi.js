'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// eslint-disable-next-line node/no-sync
const openapi = yaml.load(fs.readFileSync(path.resolve(__dirname, 'openapi.yaml'), 'utf8'));

module.exports = openapi;
