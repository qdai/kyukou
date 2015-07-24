'use strict';

const createHttpError = require('http-errors');
const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const publicAPI = require('../../api').public;
const sendAPIResult = require('../../lib/sendapiresult');

/**
 * @apiDefine FormatLog
 * @apiSuccess {Object} log Log object.
 * @apiSuccess {String} log.name Log type. Same as requested <code>about</code>.
 * @apiSuccess {String} log.log Main content.
 * @apiSuccess {Number} log.level Error level.
 * @apiSuccess {Date} log.time Loged time.
 * @apiSuccess {Number} log.elapsedTime Elapsed time in ms.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "name": "task",
 *     "log": "msg: 0 event(s) created\nmsg: 19 event(s) already exist",
 *     "level": 1,
 *     "time": "2015-01-21T11:05:00.298Z",
 *     "elapsedTime": 915.768167
 *   }
 */
router.get('/', function () {
  throw createHttpError(400);
});

/**
 * @api {get} /logs/:about.json :About
 * @apiDescription Get latest log.
 * @apiVersion 1.0.0
 * @apiName LogsAbout
 * @apiGroup Logs
 *
 * @apiParam {String=task,twit_new,twit_tomorrow,delete} about
 *
 * @apiUse FormatLog
 */
router.get('/:about.json', function (req, res) {
  const about = req.params.about;
  sendAPIResult(publicAPI.logs.about(about), res);
});

module.exports = router;
