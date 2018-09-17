'use strict';

const api = require('./api');
const router = require('./router');
const { servers: [{ variables: { basePath: { default: route } } }] } = require('./openapi');

module.exports = Object.assign({
  route: `/${route}`,
  router
}, api);
