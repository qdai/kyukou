/* eslint no-console: 0 */

'use strict';

const { CronJob } = require('cron');

const tasksAPI = require('./api1').tasks;
const reportTaskResult = task => {
  task
    .then(tasklog => `msg: ${tasklog.name} done`)
    .catch(err => `err: ${err.stack}`)
    .then(msg => {
      console.log(msg);
    });
};

const jobScrap = new CronJob('0 25,55 * * * *', () => {
  reportTaskResult(tasksAPI.scrap());
}, null, true, 'Asia/Tokyo');
console.log('Job scrap running:', jobScrap.running);

const jobTwitNew = new CronJob('0 */15 0-21,23 * * *', () => {
  reportTaskResult(tasksAPI.twitNew());
}, null, true, 'Asia/Tokyo');
console.log('Job twit_new running:', jobTwitNew.running);

const jobTwitTomorrow = new CronJob('0 */15 22 * * *', () => {
  reportTaskResult(tasksAPI.twitTomorrow());
}, null, true, 'Asia/Tokyo');
console.log('Job twit_tomorrow running:', jobTwitTomorrow.running);

const jobDelete = new CronJob('0 5 2 * * *', () => {
  reportTaskResult(tasksAPI.delete());
}, null, true, 'Asia/Tokyo');
console.log('Job delete running:', jobDelete.running);
