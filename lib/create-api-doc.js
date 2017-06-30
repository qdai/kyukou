'use strict';

const apidoc = require('apidoc'); // eslint-disable-line node/no-unpublished-require
const hljs = require('highlight.js'); // eslint-disable-line node/no-unpublished-require

const createApiDoc = src => {
  const doc = apidoc.createDoc({
    debug: false,
    parse: true,
    silent: true,
    src
  });
  doc.data = JSON.parse(doc.data);
  doc.project = JSON.parse(doc.project);
  doc.list = {};
  doc.data.map(api => {
    // List
    if (!doc.list[api.group]) {
      doc.list[api.group] = [];
    }
    doc.list[api.group].push(api.title);
    // Examples
    api.success.examples = api.success.examples.map(example => {
      example.content = hljs.highlight(example.type, example.content, true).value;
      return example;
    });
    return api;
  });
  return doc;
};

module.exports = createApiDoc;
