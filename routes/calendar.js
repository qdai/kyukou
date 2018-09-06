'use strict';

const express = require('express');
const moment = require('moment');
const path = require('path');
const site = require('../lib/site');
const vobject = require('vobject');

const router = express.Router();

const eventsAPI = require('../api1').events;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/calendar.html'));
});

router.get('/kyukou.ics', (req, res) => {
  const departments = req.query.departments || req.query.department;
  eventsAPI.list(departments).then(events => {
    const calendar = vobject.calendar()
      .setProperty(vobject.property('PRODID', `-//${site.author}//${site.generator}//EN`));
    events.forEach(event => {
      const startDate = moment(event.eventDate);
      const endDate = startDate.clone().add(1, 'day');
      const vevent = vobject.event()
        .setSummary(event.asString('title'))
        .setDescription(event.asString('note'))
        .setUID(event.hash)
        .setDTStart(vobject.dateValue(startDate.format('YYYY-MM-DD')))
        .setDTEnd(vobject.dateValue(endDate.format('YYYY-MM-DD')));
      calendar.pushComponent(vevent);
    });
    res.set('Content-Type', 'text/calendar');
    res.send(calendar.toICS());
  });
});

module.exports = router;
