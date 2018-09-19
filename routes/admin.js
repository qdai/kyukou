'use strict';

const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const passport = require('passport');
const router = require('express-promise-router')();
const site = require('../lib/site');
const { Strategy: LocalStrategy } = require('passport-local');
const { events: eventsAPI } = require('../api-v1');

const admin = {
  hash: process.env.ADMIN_HASH,
  name: process.env.ADMIN_NAME
};

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

router.post('/events/add', async (req, res) => {
  if (req.isAuthenticated()) {
    const event = req.body;
    const result = await eventsAPI.add(event);
    res.json(result);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/edit', async (req, res) => {
  if (req.isAuthenticated()) {
    const { hash, key, value } = req.body;
    const data = { [key]: value };
    const result = await eventsAPI.edit(hash, data);
    res.json(result);
  } else {
    throw createHttpError(403);
  }
});

router.post('/events/delete', async (req, res) => {
  if (req.isAuthenticated()) {
    const { hash } = req.body;
    const result = await eventsAPI.delete(hash);
    res.json(result);
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
