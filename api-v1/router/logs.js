'use strict';

const createHttpError = require('http-errors');
const router = require('express-promise-router')();
const { logs: logsAPI } = require('../api');

router.get('/', () => {
  throw createHttpError(400);
});

router.get('/:about.json', async (req, res) => {
  const { about } = req.params;
  const log = await logsAPI.about(about === 'task' ? 'scrap' : about);
  res.json({
    ...log,
    name: about
  });
});

module.exports = router;
