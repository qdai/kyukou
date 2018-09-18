'use strict';

const Api = require('kyukou-api1');
const scraperObject = require('kyukou-scraper-kyudai1');
const { CronJob } = require('cron');

const scrapers = Object.values(scraperObject);

const api = new Api({
  mongoURI: process.env.DB_API_VERSION_1_MONGO_URI,
  scrapers,
  twitter: {
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  }
});

const reportTaskResult = task => {
  task
    .then(tasklog => `msg: ${tasklog.name} done`)
    .catch(err => `err: ${err.stack}`)
    .then(msg => {
      console.log(msg); // eslint-disable-line no-console
    });
};

const jobScrap = new CronJob('0 25,55 * * * *', () => {
  reportTaskResult(api.tasks.scrap());
}, null, true, 'Asia/Tokyo');

const jobTwitNew = new CronJob('0 */15 0-21,23 * * *', () => {
  reportTaskResult(api.tasks.twitNew());
}, null, true, 'Asia/Tokyo');

const jobTwitTomorrow = new CronJob('0 */15 22 * * *', () => {
  reportTaskResult(api.tasks.twitTomorrow());
}, null, true, 'Asia/Tokyo');

const jobDelete = new CronJob('0 5 2 * * *', () => {
  reportTaskResult(api.tasks.delete());
}, null, true, 'Asia/Tokyo');

/* eslint-disable no-console */
console.log('Job scrap running:', jobScrap.running);
console.log('Job twit_new running:', jobTwitNew.running);
console.log('Job twit_tomorrow running:', jobTwitTomorrow.running);
console.log('Job delete running:', jobDelete.running);
/* eslint-enable no-console */

module.exports = api;
