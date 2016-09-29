'use strict';

const apidoc = require('apidoc');
const hljs = require('highlight.js');

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
    // list
    if (!doc.list[api.group]) {
      doc.list[api.group] = [];
    }
    doc.list[api.group].push(api.title);
    // examples
    api.success.examples = api.success.examples.map(example => {
      example.content = hljs.highlight(example.type, example.content, true).value;
      return example;
    });
    return api;
  });
  return doc;
};

module.exports = createApiDoc;
