'use strict';

const config = require('config');
const express = require('express');
const moment = require('moment');
const RSS = require('rss');

const router = express.Router(); // eslint-disable-line new-cap
const site = config.get('site');

const get = require('../lib/getasstring');
const publicAPI = require('../api').public;

router.get('/', function (req, res) {
  publicAPI.events.list().then(function (events) {
    const feed = new RSS({
      title: site.name,
      description: site.description,
      generator: site.generator,
      feed_url: 'https://' + site.url + '/rss', // eslint-disable-line camelcase
      site_url: 'https://' + site.url, // eslint-disable-line camelcase
      language: site.lang,
      ttl: 180
    });
    events.sort(function (a, b) {
      return moment(b.pubDate).diff(moment(a.pubDate));
    }).slice(0, 20).forEach(function (event) {
      feed.item({
        title: get(event).asRSSTitle(),
        description: get(event).asRSSDescription(),
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
