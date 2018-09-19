'use strict';

const ical = require('ical-generator');
const moment = require('moment');
const router = require('express-promise-router')();
const site = require('../lib/site');
const { events: eventsAPI } = require('../api-v1');

router.get('/', (req, res) => {
  res.render('calendar', { site });
});

router.get('/kyukou.ics', async (req, res) => {
  const departments = req.query.departments || req.query.department;
  const events = await eventsAPI.list(departments);
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

module.exports = router;
