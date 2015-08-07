'use strict';

const express = require('express');
const path = require('path');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/status.html'));
});

module.exports = router;
