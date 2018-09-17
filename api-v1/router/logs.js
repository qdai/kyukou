'use strict';

const createHttpError = require('http-errors');
const express = require('express');

const router = express.Router();

const logsAPI = require('../api').logs;
const sendAPIResult = require('../../lib/sendapiresult');

router.get('/', () => {
  throw createHttpError(400);
});

router.get('/:about.json', (req, res) => {
  const { about } = req.params;
  if (about === 'task') {
    sendAPIResult(logsAPI.about('scrap').then(log => {
      log.name = 'task';
      return log;
    }), res);
  } else {
    sendAPIResult(logsAPI.about(about), res);
  }
});

module.exports = router;
