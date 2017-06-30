'use strict';

const crypto = require('crypto');
const fs = require('fs');
const glob = require('glob'); // eslint-disable-line node/no-unpublished-require

const createHashes = (algorithm, src) => glob.sync(src)
  .map(file => fs.readFileSync(file, 'utf8'))
  .map(str => crypto.createHash(algorithm).update(str, 'utf8').digest('base64'));

module.exports = createHashes;
