'use strict';

const config = require('config');
const createHttpError = require('http-errors');
const express = require('express');
const path = require('path');
const pwd = require('pwd');

const admin = config.get('admin');
const router = express.Router();

const eventsAPI = require('../api1').events;
const sendAPIResult = require('../lib/sendapiresult');

router.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/admin');
  } else {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
});

router.post('/login', (req, res) => {
  const name = req.body.name;
  const pass = req.body.password;
  if (name === admin.name) {
    new Promise((resolve, reject) => {
      pwd.hash(pass, admin.salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    }).then(hash => {
      if (hash !== admin.hash) {
        res.redirect('/admin/login');
      } else {
        req.session.loggedin = true;
        res.redirect('/admin');
      }
    });
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/events/add', (req, res) => {
  if (req.session.loggedin) {
    const event = req.body;
    sendAPIResult(eventsAPI.add(event), res);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/edit', (req, res) => {
  if (req.session.loggedin) {
    const hash = req.body.hash;
    const key = req.body.key;
    const value = req.body.value;
    const data = {};
    data[key] = value;
    sendAPIResult(eventsAPI.edit(hash, data), res);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/delete', (req, res) => {
  if (req.session.loggedin) {
    const hash = req.body.hash;
    sendAPIResult(eventsAPI.delete(hash), res);
  } else {
    throw createHttpError(403);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

router.get('/events', () => {
  throw createHttpError(400);
});

router.get('/events/:method', req => {
  if (['add', 'edit', 'delete'].indexOf(req.params.method) !== -1) {
    throw createHttpError(405);
  } else {
    throw createHttpError(400);
  }
});

module.exports = router;
