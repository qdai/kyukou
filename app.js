'use strict';

const bodyParser = require('body-parser');
const compression = require('compression');
const connectMongo = require('connect-mongo');
const createHttpError = require('http-errors');
const enforcesSsl = require('express-enforces-ssl');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app = express();
const MongoStore = connectMongo(session);
const sessionOptions = {
  cookie: {},
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET,
  store: new MongoStore({
    autoReconnect: true,
    url: process.env.DB_MONGO_URI
  })
};
if (app.get('env') === 'production') {
  sessionOptions.cookie.secure = true;
}

// Routes
const routes = require('./routes/index');
const rss = require('./routes/rss');
const calendar = require('./routes/calendar');
const api1 = require('./api-v1');
const api0 = require('./routes/api0');
const admin = require('./routes/admin');

// Settings
app.set('trust proxy', true);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (app.get('env') === 'production') {
  app.use(enforcesSsl());
}
app.use((req, res, next) => {
  res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64');
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      objectSrc: ["'none'"],
      styleSrc: ["'unsafe-inline'", (req, res) => `'nonce-${res.locals.styleNonce}'`]
    }
  },
  hsts: { maxAge: 31536000 }
}));
app.use((req, res, next) => {
  res.set('X-UA-Compatible', 'ie=edge');
  next();
});
app.use(compression());
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Session for routes/admin
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/rss', rss);
app.use('/calendar', calendar);
app.use(api1.route, api1.router);
app.use('/api', api0);
app.use('/admin', admin);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error handlers

/*
 * Development error handler
 * Will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500).type('text/plain').send(err.stack);
  });
}

/*
 * Production error handler
 * No stacktraces leaked to user
 */
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500).type('text/plain').send(err.message);
});

module.exports = app;
