'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const site = require('../../lib/site');
const yaml = require('js-yaml');
const { contentSecurityPolicy } = require('helmet');

const openapi = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../../openapi.yaml'), 'utf8'));
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
    site
  });
});

module.exports = router;
