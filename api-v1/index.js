'use strict';

const api = require('./api');
const router = require('./router');
const { servers: [{ variables: { basePath: { default: route } } }] } = require('./openapi');

module.exports = {
  ...api,
  route: `/${route}`,
  router
};
