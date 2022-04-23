'use strict';

const createHttpError = require('http-errors');
const router = require('express-promise-router')();
const { events: eventsAPI } = require('../api');

router.get('/', () => {
  throw new createHttpError.BadRequest();
});

router.get('/list.json', async (req, res) => {
  const { count, departments, start_index: startIndex } = req.query;
  const events = await eventsAPI.list(departments, startIndex, count);
  res.json(events);
});

router.get('/:yyyy-:mm-:dd.json', async (req, res) => {
  const { count, dd, mm, yyyy } = req.params;
  const events = await eventsAPI.yyyymmdd(yyyy, mm, dd, count);
  res.json(events);
});

router.get('/search.json', async (req, res) => {
  const { count, q } = req.query;
  const events = await eventsAPI.search(q, count);
  res.json(events);
});

module.exports = router;
