'use strict';

const config = require('config');
const CronJob = require('cron').CronJob;

const privateAPI = require('./api').private;
const reportTaskResult = task => {
  task.then(tasklog => {
    return 'msg: ' + tasklog.name + ' done';
  }).catch(err => {
    return 'err: ' + err.stack;
  }).then(msg => {
    console.log(msg);
  });
};
const twitter = config.get('twitter');

// run task.js 0, 4, 8, 12, 16, 20
const jobTask = new CronJob('0 5 0,4,8,12,16,20 * * *', () => {
  reportTaskResult(privateAPI.tasks.task());
}, null, true, 'Asia/Tokyo');
console.log('Job task running:', jobTask.running);

// run twit_new.js 1, 5, 9, 13, 17, 21
const jobTwitNew = new CronJob('0 0,5,10 1,5,9,13,17,21 * * *', () => {
  reportTaskResult(privateAPI.tasks.twitNew(twitter));
}, null, true, 'Asia/Tokyo');
console.log('Job twit_new running:', jobTwitNew.running);

// run twit_tomorrow.js 22
const jobTwitTomorrow = new CronJob('0 0,5,10 22 * * *', () => {
  reportTaskResult(privateAPI.tasks.twitTomorrow(twitter));
}, null, true, 'Asia/Tokyo');
console.log('Job twit_tomorrow running:', jobTwitTomorrow.running);

// run delete.js 2
const jobDelete = new CronJob('0 5 2 * * *', () => {
  reportTaskResult(privateAPI.tasks.delete());
}, null, true, 'Asia/Tokyo');
console.log('Job delete running:', jobDelete.running);
