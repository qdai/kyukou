/* eslint-disable no-process-env */

'use strict';

require('dotenv-safe').config();

const jsonfile = require('jsonfile');
const path = require('path');

const { author, name, version } = jsonfile.readFileSync(path.join(__dirname, './package.json'));

const env = {
  DB_API_VERSION_1_MONGO_URI: process.env.DB_API_VERSION_1_MONGO_URI,
  DB_MONGO_URI: process.env.DB_MONGO_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  SITE: {
    author,
    description: process.env.SITE_DESCRIPTION,
    generator: name,
    keywords: process.env.SITE_KEYWORDS,
    lang: process.env.SITE_LANG || 'ja',
    name: process.env.SITE_NAME,
    short_name: process.env.SITE_SHORT_NAME,
    theme_color: process.env.SITE_THEME_COLOR || '#ffffff',
    twitter: process.env.TWITTER_SCREEN_NAME,
    url: process.env.SITE_URL,
    version
  },
  TWITTER: {
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  }
};

module.exports = env;
