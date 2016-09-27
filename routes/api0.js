'use strict';

const config = require('config');
const createHttpError = require('http-errors');
const express = require('express');

const router = express.Router();

const errorMessage = `API v0 is no longer active. Please migrate to API v1 (${config.get('site.url')}/api/1).`;

router.get('/list.json', () => {
  throw createHttpError(410, errorMessage);
});

router.get('/log/:about.json', () => {
  throw createHttpError(410, errorMessage);
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

router.get('/', () => {
  throw createHttpError(410, errorMessage);
});

module.exports = router;
