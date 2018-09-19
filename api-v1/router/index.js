'use strict';

const events = require('./events');
const logs = require('./logs');
const openapi = require('../openapi');
const router = require('express-promise-router')();
const site = require('../../lib/site');
const { NotFound } = require('http-errors');
const { contentSecurityPolicy } = require('helmet');

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
    site: {
      ...site,
      url: `${site.url}/${openapi.servers[0].variables.basePath.default}`
    }
  });
});

router.use((req, res, next) => {
  next(new NotFound('Page does not exist'));
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

module.exports = router;
