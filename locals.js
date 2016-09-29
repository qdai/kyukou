'use strict';

const config = require('config');
const createApiDoc = require('./lib/create-api-doc');
const path = require('path');

const api = path.join(__dirname, 'routes/api1');

module.exports = {
  doc: createApiDoc(api),
  site: config.get('site')
};
