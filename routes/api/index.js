'use strict';

const express = require('express');
const path = require('path');

const router = express.Router(); // eslint-disable-line new-cap

const events = require('./events');
const logs = require('./logs');

router.use('/events', events);
router.use('/logs', logs);

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../views/api.html'));
});

module.exports = router;
