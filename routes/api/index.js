'use strict';

const config = require('config');
const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');

const router = express.Router(); // eslint-disable-line new-cap

const doc = jsonfile.readFileSync(path.join(__dirname, '../../api.json'));
const events = require('./events');
const logs = require('./logs');

router.use('/events', events);
router.use('/logs', logs);

router.get('/', function (req, res) {
  res.render('api', {
    site: config.get('site'),
    page: {
      title: doc.project.title,
      description: doc.project.description,
      keywords: '九州大学休講情報 API,九州大学,九大,休講情報,休講,API'
    },
    doc
  });
});

module.exports = router;
