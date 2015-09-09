'use strict';

const config = require('config');
const express = require('express');
const moment = require('moment');
const path = require('path');
const vobject = require('vobject');

const router = express.Router();
const site = config.get('site');

const get = require('../lib/getasstring');
const publicAPI = require('../api').public;

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/calendar.html'));
});

router.get('/kyukou.ics', (req, res) => {
  const departments = req.query.departments || req.query.department;
  publicAPI.events.list(departments).then(events => {
    const calendar = vobject.calendar();
    calendar.setProperty(vobject.property('PRODID', '-//' + site.author + '//' + site.generator + '//EN'));
    events.forEach(event => {
      const startDate = moment(event.eventDate);
      const endDate = startDate.clone().add(1, 'day');
      const vevent = vobject.event();
      vevent.setSummary(get(event).asCalSummary());
      vevent.setDescription(get(event).asCalDescription());
      vevent.setUID(event.hash);
      vevent.setDTStart(vobject.dateValue(startDate.format('YYYY-MM-DD')));
      vevent.setDTEnd(vobject.dateValue(endDate.format('YYYY-MM-DD')));
      calendar.pushComponent(vevent);
    });
    res.set('Content-Type', 'text/calendar');
    res.send(calendar.toICS());
  });
});

module.exports = router;
