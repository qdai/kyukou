'use strict';

const config = require('config');

const mongoURI = config.get('mongoURI');

const api = require('kyukou-api')(mongoURI);

module.exports = api;
