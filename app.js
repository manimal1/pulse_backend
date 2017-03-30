/**
 * Setting Environment to Run in
 *
 * @type {string}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Requires
 */
var config = require('./config');
var express = require('./config/express');
var passport = require('./config/passport')();

var HttpServer = require('http').Server;
var socketIo = require('socket.io');

var app = express();

var server = new HttpServer(app);
var io = socketIo(server);

io.on('connection', function(socket) {
  console.log('a user connected');
});

server.listen(config.port, function() {
  console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
});

module.exports = app;
