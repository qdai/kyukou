'use strict';

const createHttpError = require('http-errors');
const express = require('express');

const router = express.Router();

const eventsAPI = require('../../api1').events;
const sendAPIResult = require('../../lib/sendapiresult');

router.get('/', () => {
  throw createHttpError(400);
});

router.get('/list.json', (req, res) => {
  const { count, departments, start_index: startIndex } = req.query;
  sendAPIResult(eventsAPI.list(departments, startIndex, count), res);
});

router.get('/:yyyy-:mm-:dd.json', (req, res) => {
  const { count, dd, mm, yyyy } = req.params;
  sendAPIResult(eventsAPI.yyyymmdd(yyyy, mm, dd, count), res);
});

router.get('/search.json', (req, res) => {
  const { count, q } = req.query;
  sendAPIResult(eventsAPI.search(q, count), res);
});

module.exports = router;
