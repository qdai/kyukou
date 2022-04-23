'use strict';

const createHttpError = require('http-errors');
const express = require('express');
const { SITE: site } = require('../env');

const router = express.Router();

const errorMessage = `API v0 is no longer active. Please migrate to API v1 (${site.url}/api/1).`;

router.get('/list.json', () => {
  throw new createHttpError.Gone(errorMessage);
});

router.get('/log/:about.json', () => {
  throw new createHttpError.Gone(errorMessage);
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

router.get('/', () => {
  throw new createHttpError.Gone(errorMessage);
});

module.exports = router;
