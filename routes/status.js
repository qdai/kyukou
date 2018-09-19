'use strict';

const express = require('express');
const site = require('../lib/site');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('status', { site });
});

module.exports = router;
