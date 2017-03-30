/**
 * Setting Environment to Run in
 *
 * @type {string}
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const server = require( './config/hapi');

server.init();

// We'll have to figure out something for IO
// io.on('connection', function(socket) {
//   console.log('a user connected');
// });

// This is handled by startServer in ./config/hapi
// server.listen(config.port, function() {
//   console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
// });
