'use strict';

const createHttpError = require('http-errors');
const express = require('express');

const router = express.Router();

const eventsAPI = require('../../api').events;
const sendAPIResult = require('../../lib/sendapiresult');

/**
 * @apiDefine FormatEvents
 * @apiSuccess {Object[]} events Array of event. Sorted by <code>eventDate</code> and <code>period</code>.
 * @apiSuccess {String} events.about Event type.
 * @apiSuccess {String} events.department Department.
 * @apiSuccess {String} events.subject Subject.
 * @apiSuccess {String} events.period Event period.
 * @apiSuccess {String} events.link Event URL.
 * @apiSuccess {Date} events.eventDate Event date.
 * @apiSuccess {Date} events.pubDate Date the event published.
 * @apiSuccess {String} events.raw Event source.
 * @apiSuccess {String} events.hash Event ID.
 * @apiSuccess {Object} events.tweet Tweet flags.
 * @apiSuccess {Boolean} events.tweet.new
 * @apiSuccess {Boolean} events.tweet.tomorrow
 * @apiSuccess {String} [events.campus] Campus.
 * @apiSuccess {String} [events.room] Room.
 * @apiSuccess {String} [events.teacher] Teacher.
 * @apiSuccess {String} [events.note] Notes.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "about": "休講",
 *       "department": "教育学部",
 *       "subject": "教科名",
 *       "period": "1",
 *       "link": "http://www.education.kyushu-u.ac.jp/topics/student_index",
 *       "eventDate": "2015-01-18T15:00:00.000Z",
 *       "pubDate": "2015-01-15T15:00:00.000Z",
 *       "raw": "【休講】1月19日（月） 1限 「教科名」（教員名教員）",
 *       "hash": "89c5918f7d1decffcfd72eebec6413ac7f3795d71f335bd97129df0c69818e8f",
 *       "tweet": {
 *         "tomorrow": true,
 *         "new": true
 *       },
 *       "teacher": "教員名"
 *     }
 *   ]
 */
router.get('/', () => {
  throw createHttpError(400);
});

/**
 * @api {get} /events/list.json List
 * @apiDescription Get a list of current sheduled events.
 * @apiVersion 1.1.0
 * @apiName EventsList
 * @apiGroup Events
 *
 * @apiParam {string[]=edu,lit,law,sci,econ} [departments] Specify department. Must be array of allowed values.
 * @apiParam {Number} [start_index=0] Starting index.
 * @apiParam {Number} [count] List count. Returns all event if <code>count</code> is not specified.
 *
 * @apiUse FormatEvents
 */
router.get('/list.json', (req, res) => {
  const departments = req.query.departments;
  const startIndex = req.query.start_index;
  const count = req.query.count;
  sendAPIResult(eventsAPI.list(departments, startIndex, count), res);
});

/**
 * @api {get} /events/:YYYY-:MM-:DD.json :YYYY-:MM-:DD
 * @apiDescription Get a list of YYYY-MM-DD's events.
 * @apiVersion 1.0.0
 * @apiName EventsYYYYMMDD
 * @apiGroup Events
 *
 * @apiParam {Number} YYYY Year.
 * @apiParam {Number} MM Month.
 * @apiParam {Number} DD Date.
 * @apiParam {Number} [count] List count. Returns all event if <code>count</code> is not specified.
 *
 * @apiUse FormatEvents
 */
router.get('/:yyyy-:mm-:dd.json', (req, res) => {
  const yyyy = req.params.yyyy;
  const mm = req.params.mm;
  const dd = req.params.dd;
  const count = req.query.count;
  sendAPIResult(eventsAPI.yyyymmdd(yyyy, mm, dd, count), res);
});

/**
 * @api {get} /events/search.json Search
 * @apiDescription Get a list of events matched search query.
 * @apiVersion 1.0.0
 * @apiName EventsSearch
 * @apiGroup Events
 *
 * @apiParam {String} q Query.
 * @apiParam {Number} [count] List count. Returns all event if <code>count</code> is not specified.
 *
 * @apiUse FormatEvents
 */
router.get('/search.json', (req, res) => {
  const q = req.query.q;
  const count = req.query.count;
  sendAPIResult(eventsAPI.search(q, count), res);
});

module.exports = router;
