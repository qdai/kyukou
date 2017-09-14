'use strict';

const config = require('config');
const express = require('express');
const path = require('path');

const router = express.Router();
const site = config.get('site');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/app.html'));
});

router.get('/manifest.webmanifest', (req, res) => {
  res.type('application/manifest+json');
  res.json({
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        sizes: '192x192',
        src: '/android-chrome-192x192.png',
        type: 'image/png'
      },
      {
        sizes: '512x512',
        src: '/android-chrome-512x512.png',
        type: 'image/png'
      }
    ],
    name: site.name,
    short_name: site.short_name,
    start_url: '/',
    theme_color: site.theme_color
  });
});

module.exports = router;
