'use strict';

const config = require('config');

const mongoURI = config.get('api1');
const twitter = config.get('twitter');

const Api = require('kyukou-api1');
const scraperObject = require('kyukou-scraper-kyudai1');

const scrapers = Object.keys(scraperObject).map(key => scraperObject[key]);

const api = new Api({
  mongoURI,
  scrapers,
  twitter
});

module.exports = api;
