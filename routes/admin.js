'use strict';

const createHttpError = require('http-errors');
const passport = require('passport');
const router = require('express-promise-router')();
const site = require('../lib/site');
const { Strategy: LocalStrategy } = require('passport-local');
const { events: eventsAPI } = require('../api-v1');
const User = require('../models/user');

passport.use(new LocalStrategy(async (name, password, done) => {
  try {
    const user = await User.findOne({ name });
    if (user && await user.verifyPassword(password)) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
}));
passport.serializeUser((user, done) => {
  done(null, user.name);
});
passport.deserializeUser((name, done) => {
  User.findOne({ name }, (err, user) => {
    done(err, user);
  });
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

router.post('/events', async (req, res) => {
  if (req.isAuthenticated()) {
    const event = req.body;
    const result = await eventsAPI.add(event);
    res.json(result);
  } else {
    throw createHttpError(403);
  }
});

router.put('/events/:hash', async (req, res) => {
  if (req.isAuthenticated()) {
    const data = req.body;
    const { hash } = req.params;
    const result = await eventsAPI.edit(hash, data);
    res.json(result);
  } else {
    throw createHttpError(403);
  }
});

router.delete('/events/:hash', async (req, res) => {
  if (req.isAuthenticated()) {
    const { hash } = req.params;
    const result = await eventsAPI.delete(hash);
    res.json(result);
  } else {
    throw createHttpError(403);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

module.exports = router;
