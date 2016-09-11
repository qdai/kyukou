'use strict';

const jsonfile = require('jsonfile');
const path = require('path');

const pkg = jsonfile.readFileSync(path.join(__dirname, '../package.json'));

module.exports = {
  admin: {
    hash: '',
    name: ''
  },
  api1: 'mongodb://localhost/kyukou',
  mongoURI: 'mongodb://localhost/kyukou',
  secret: '',
  site: {
    author: pkg.author,
    description: '',
    generator: pkg.name,
    keywords: '',
    lang: 'ja',
    name: '',
    twitter: '',
    url: '',
    version: `v${pkg.version}`
  },
  twitter: {
    access_token: '',
    access_token_secret: '',
    consumer_key: '',
    consumer_secret: ''
  }
};
