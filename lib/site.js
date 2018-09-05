'use strict';

require('dotenv-safe').config();

const jsonfile = require('jsonfile');
const path = require('path');

const { author, name, version } = jsonfile.readFileSync(path.join(__dirname, '../package.json'));

const site = {
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
  version: `v${version}`
};

module.exports = site;
