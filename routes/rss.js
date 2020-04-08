'use strict';

const RSS = require('rss');
const moment = require('moment');
const router = require('express-promise-router')();
const { SITE: site } = require('../env');
const { events: eventsAPI } = require('../api-v1');

router.get('/', async (req, res) => {
  const events = await eventsAPI.list();
  const feed = new RSS({
    description: site.description,
    feed_url: `${site.url}/rss`,
    generator: site.generator,
    language: site.lang,
    site_url: site.url,
    title: site.name,
    ttl: 180
  });
  events
    .sort((a, b) => moment(b.pubDate).diff(moment(a.pubDate)))
    .slice(0, 20).forEach(event => {
      feed.item({
        date: event.pubDate.toISOString(),
        description: event.asString(null, '<br />'),
        guid: event.hash,
        title: event.asString('summary'),
        url: event.link
      });
    });
  res.set('Content-Type', 'application/rss+xml');
  res.send(feed.xml());
});

module.exports = router;
