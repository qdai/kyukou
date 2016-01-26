'use strict';

const CronJob = require('cron').CronJob;

const tasksAPI = require('./api').tasks;
const reportTaskResult = task => {
  task
    .then(tasklog => `msg: ${tasklog.name} done`)
    .catch(err => `err: ${err.stack}`)
    .then(msg => {
      console.log(msg);
    });
};

const jobScrap = new CronJob('0 5 0,4,8,12,16,20 * * *', () => {
  reportTaskResult(tasksAPI.scrap());
}, null, true, 'Asia/Tokyo');
console.log('Job scrap running:', jobScrap.running);

const jobTwitNew = new CronJob('0 0,5,10 1,5,9,13,17,21 * * *', () => {
  reportTaskResult(tasksAPI.twitNew());
}, null, true, 'Asia/Tokyo');
console.log('Job twit_new running:', jobTwitNew.running);

const jobTwitTomorrow = new CronJob('0 0,5,10 22 * * *', () => {
  reportTaskResult(tasksAPI.twitTomorrow());
}, null, true, 'Asia/Tokyo');
console.log('Job twit_tomorrow running:', jobTwitTomorrow.running);

const jobDelete = new CronJob('0 5 2 * * *', () => {
  reportTaskResult(tasksAPI.delete());
}, null, true, 'Asia/Tokyo');
console.log('Job delete running:', jobDelete.running);
