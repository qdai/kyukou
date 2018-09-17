'use strict';

const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const express = require('express');
const passport = require('passport');
const site = require('../lib/site');
const { Strategy: LocalStrategy } = require('passport-local');

const admin = {
  hash: process.env.ADMIN_HASH,
  name: process.env.ADMIN_NAME
};
const router = express.Router();

passport.use(new LocalStrategy({
  passReqToCallback: true,
  passwordField: 'password',
  usernameField: 'name'
}, (req, name, password, done) => {
  if (name === admin.name) {
    bcrypt.compare(password, admin.hash, (err, match) => {
      if (err) {
        return done(err);
      }
      if (match) {
        return done(null, admin);
      }
      return done(null, false);
    });
  } else {
    done(null, false);
  }
}));
passport.serializeUser((account, done) => {
  done(null, account.name);
});
passport.deserializeUser((serializedAccount, done) => {
  if (serializedAccount === admin.name) {
    done(null, admin);
  } else {
    done(new Error('Unknown account'));
  }
});

const eventsAPI = require('../api-v1').events;
const sendAPIResult = require('../lib/sendapiresult');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('admin', { site });
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('login', { site });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/admin'
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => res.redirect('/'));
});

router.post('/events/add', (req, res) => {
  if (req.isAuthenticated()) {
    const event = req.body;
    sendAPIResult(eventsAPI.add(event), res);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/edit', (req, res) => {
  if (req.isAuthenticated()) {
    const { hash, key, value } = req.body;
    const data = {};
    data[key] = value;
    sendAPIResult(eventsAPI.edit(hash, data), res);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/delete', (req, res) => {
  if (req.isAuthenticated()) {
    const { hash } = req.body;
    sendAPIResult(eventsAPI.delete(hash), res);
  } else {
    throw createHttpError(403);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

router.get('/events', () => {
  throw createHttpError(400);
});

router.get('/events/:method', req => {
  if ([
    'add',
    'edit',
    'delete'
  ].includes(req.params.method)) {
    throw createHttpError(405);
  } else {
    throw createHttpError(400);
  }
});

module.exports = router;
