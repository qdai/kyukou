'use strict';

const express = require('express');
const ical = require('ical-generator');
const moment = require('moment');
const path = require('path');
const site = require('../lib/site');

const router = express.Router();

const eventsAPI = require('../api1').events;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/calendar.html'));
});

router.get('/kyukou.ics', (req, res) => {
  const departments = req.query.departments || req.query.department;
  eventsAPI.list(departments).then(events => {
    const cal = ical({
      domain: new URL(site.url).hostname,
      events: events.map(event => {
        const start = moment(event.eventDate);
        const end = start.clone().add(1, 'day');
        return {
          description: event.asString('note'),
          end,
          start,
          summary: event.asString('title'),
          timestamp: moment(event.pubDate),
          uid: event.hash
        };
      }),
      prodId: `//${site.author}//${site.generator}//EN`
    });
    cal.serve(res);
  });
});

module.exports = router;
