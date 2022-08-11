'use strict';

const User = require('../models/user');
const createHttpError = require('http-errors');
const passport = require('passport');
const router = require('express-promise-router')();
const { Strategy: LocalStrategy } = require('passport-local');
const { events: eventsAPI } = require('../api-v1');

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
  res.json({ isAdmin: req.isAuthenticated() });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({});
    }
    return req.logIn(user, logInErr => {
      if (logInErr) {
        return next(logInErr);
      }
      return res.json({});
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => res.json({}));
  });
});

router.post('/events', async (req, res) => {
  if (req.isAuthenticated()) {
    const event = req.body;
    const result = await eventsAPI.add(event);
    res.json(result);
  } else {
    throw new createHttpError.Forbidden();
  }
});

router.put('/events/:hash', async (req, res) => {
  if (req.isAuthenticated()) {
    const data = req.body;
    const { hash } = req.params;
    const result = await eventsAPI.edit(hash, data);
    res.json(result);
  } else {
    throw new createHttpError.Forbidden();
  }
});

router.delete('/events/:hash', async (req, res) => {
  if (req.isAuthenticated()) {
    const { hash } = req.params;
    const result = await eventsAPI.delete(hash);
    res.json(result);
  } else {
    throw new createHttpError.Forbidden();
  }
});

router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({ error: { message: err.message } });
});

module.exports = router;
