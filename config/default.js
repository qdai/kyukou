'use strict';

const jsonfile = require('jsonfile');
const path = require('path');

const pkg = jsonfile.readFileSync(path.join(__dirname, '../package.json'));

module.exports = {
  admin: {
    name: '',
    hash: '',
    salt: ''
  },
  secret: '',
  mongoURI: 'mongodb://localhost/kyukou',
  api1: 'mongodb://localhost/kyukou',
  twitter: {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
  },
  site: {
    name: '',
    description: '',
    keywords: '',
    url: '',
    lang: 'ja',
    twitter: '',
    version: `v${pkg.version}`,
    author: pkg.author,
    generator: pkg.name
  }
};
