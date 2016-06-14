'use strict';

module.exports = (getPromise, res) => {
  getPromise.then(data => {
    res.json(data);
  }).catch(err => {
    res.status(err.status || 500).json({ error: { message: err.message } });
  });
};
