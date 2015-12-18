'use strict';

const config = require('config');
const express = require('express');
const moment = require('moment');
const RSS = require('rss');

const router = express.Router();
const site = config.get('site');

const eventsAPI = require('../api').events;

router.get('/', (req, res) => {
  eventsAPI.list().then(events => {
    const feed = new RSS({
      title: site.name,
      description: site.description,
      generator: site.generator,
      feed_url: 'https://' + site.url + '/rss',
      site_url: 'https://' + site.url,
      language: site.lang,
      ttl: 180
    });
    events.sort((a, b) => {
      return moment(b.pubDate).diff(moment(a.pubDate));
    }).slice(0, 20).forEach(event => {
      feed.item({
        title: event.asString('summary'),
        description: event.asString(null, '<br />'),
        url: event.link,
        guid: event.hash,
        date: event.pubDate.toISOString()
      });
    });
    res.set('Content-Type', 'application/rss+xml');
    res.send(feed.xml());
  });
});

module.exports = router;
