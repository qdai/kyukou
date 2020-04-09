'use strict';

const dateFns = require('date-fns');
const ical = require('ical-generator');
const router = require('express-promise-router')();
const { SITE: site } = require('../env');
const { events: eventsAPI } = require('../api-v1');

router.get([
  '/',
  '/calendar',
  '/events',
  '/events/:hash',
  '/settings',
  '/status'
], (req, res) => {
  res.render('app', {
    loggedin: req.isAuthenticated(),
    site,
    styleNonce: res.locals.styleNonce
  });
});

router.get('/manifest.webmanifest', (req, res) => {
  res.type('application/manifest+json');
  res.json({
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        sizes: '144x144',
        src: '/android-chrome-144x144.png',
        type: 'image/png'
      },
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

router.get('/kyukou.ics', async (req, res) => {
  const departments = req.query.departments || req.query.department;
  const events = await eventsAPI.list(departments);
  const cal = ical({
    domain: new URL(site.url).hostname,
    events: events.map(event => ({
      description: event.asString('note'),
      end: dateFns.add(event.eventDate, { days: 1 }),
      start: event.eventDate,
      summary: event.asString('title'),
      timestamp: event.pubDate,
      uid: event.hash
    })),
    prodId: `//${site.author}//${site.generator}//EN`
  });
  cal.serve(res);
});

module.exports = router;
