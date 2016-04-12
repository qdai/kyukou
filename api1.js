'use strict';

const config = require('config');

const mongoURI = config.get('mongoURI');
const twitter = config.get('twitter');

const api = require('kyukou-kyudai-api');

module.exports = api({
  mongoURI,
  twitter
});
