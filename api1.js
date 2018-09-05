'use strict';

const Api = require('kyukou-api1');
const scraperObject = require('kyukou-scraper-kyudai1');

const scrapers = Object.keys(scraperObject).map(key => scraperObject[key]);

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

module.exports = api;
