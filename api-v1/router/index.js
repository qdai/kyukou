'use strict';

const express = require('express');
const openapi = require('../openapi');
const site = require('../../lib/site');
const { contentSecurityPolicy } = require('helmet');

const router = express.Router();

const events = require('./events');
const logs = require('./logs');

router.use('/events', events);
router.use('/logs', logs);

router.get('/openapi.json', (req, res) => {
  res.json(openapi);
});

router.get('/', contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ['data:'],
    objectSrc: ["'none'"],
    styleSrc: ["'unsafe-inline'"]
  }
}), (req, res) => {
  res.render('api', {
    api: openapi.info,
    site: Object.assign(site, { url: `${site.url}/${openapi.servers[0].variables.basePath.default}` })
  });
});

module.exports = router;
