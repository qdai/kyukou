'use strict';

const createApiDoc = require('./lib/create-api-doc');
const path = require('path');
const site = require('./lib/site');

const api = path.join(__dirname, 'routes/api1');

module.exports = {
  doc: createApiDoc(api),
  site
};
