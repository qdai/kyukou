'use strict';

const RSS = require('rss');
const express = require('express');
const moment = require('moment');
const site = require('../lib/site');

const router = express.Router();

const eventsAPI = require('../api-v1').events;

router.get('/', (req, res) => {
  eventsAPI.list().then(events => {
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
});

module.exports = router;
