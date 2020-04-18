'use strict';

const express = require('express');
const querystring = require('querystring');

const router = express.Router();

router.get('/kyukou.ics', (req, res) => {
  res.redirect(`/kyukou.ics${req.query ? `?${querystring.stringify(req.query)}` : ''}`);
});

module.exports = router;
