'use strict';

const config = require('config');

const mongoURI = config.get('mongoURI');
const twitter = config.get('twitter');

const Api = require('kyukou-api');
const scraperObject = require('kyukou-scraper-kyudai');

const scrapers = Object.keys(scraperObject).map(key => scraperObject[key]);

const api = new Api({
  mongoURI,
  scrapers,
  twitter
});

module.exports = api;
