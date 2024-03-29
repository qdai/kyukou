'use strict';

const events = require('./events');
const logs = require('./logs');
const openapi = require('../openapi');
const router = require('express-promise-router')();
const createHttpError = require('http-errors');
const { SITE: site } = require('../../env');
const { contentSecurityPolicy } = require('helmet');

router.use('/events', events);
router.use('/logs', logs);

router.get('/openapi.json', (req, res) => {
  res.json(openapi);
});

router.get('/', contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", 'data:'],
    objectSrc: ["'none'"],
    styleSrc: ["'unsafe-inline'"]
  }
}), (req, res) => {
  res.render('api', {
    api: openapi.info,
    site: {
      ...site,
      url: `${site.url}/${openapi.servers[0].variables.basePath.default}`
    },
    styleNonce: res.locals.styleNonce
  });
});

router.use((req, res, next) => {
  next(new createHttpError.NotFound('Page does not exist'));
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

module.exports = router;
