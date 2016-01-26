'use strict';

const config = require('config');
const express = require('express');
const path = require('path');

const router = express.Router();
const site = config.get('site');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/kyukou.appcache', (req, res) => {
  res.set('Content-Type', 'text/cache-manifest; charset=UTF-8');
  res.send(`CACHE MANIFEST
# ${site.version}

CACHE:
/js/app.bundle.js
/lib/bootstrap/dist/css/bootstrap.min.css
/icomoon/style.css
/css/main.css

NETWORK:
*
`);
});

module.exports = router;
