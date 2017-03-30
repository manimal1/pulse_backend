var config = require('./');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var HttpServer = require('http').Server;
var socketIo = require('socket.io');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var routes = require('../app/routes');

/**
 * Configuring Express
 *
 * @returns {*}
 */
module.exports = function() {
  var app = express();

  app.set('superSecret', config.secret);
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../app')));
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(session({
    secret: 'SuperSecretCookieSecret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // app.use('/', routes);
  routes(app);

  return app;
};
