'use strict';

const config = require('config');
const express = require('express');
const path = require('path');
const vobject = require('vobject');

const router = express.Router(); // eslint-disable-line new-cap
const site = config.get('site');

const get = require('../lib/getasstring');
const publicAPI = require('../api').public;

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/calendar.html'));
});

router.get('/kyukou.ics', function (req, res) {
  const departments = req.query.departments || req.query.department;
  publicAPI.events.list(departments).then(function (events) {
    const calendar = vobject.calendar();
    calendar.setProperty(vobject.property('PRODID', '-//' + site.author + '//' + site.generator + '//EN'));
    events.forEach(function (event) {
      const startDate = new Date(event.eventDate);
      startDate.setHours(startDate.getHours() + 9);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      const vevent = vobject.event();
      vevent.setSummary(get(event).asCalSummary());
      vevent.setDescription(get(event).asCalDescription());
      vevent.setUID(event.hash);
      vevent.setDTStart(vobject.dateValue(startDate.toISOString().slice(0, 10)));
      vevent.setDTEnd(vobject.dateValue(endDate.toISOString().slice(0, 10)));
      calendar.pushComponent(vevent);
    });
    res.set('Content-Type', 'text/calendar');
    res.send(calendar.toICS());
  });
});

module.exports = router;
