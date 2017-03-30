var port = 3000;

module.exports = {
  port: port,
  db: 'mongodb://localhost/pulse_db',
  secret: 'mysupersupersecret',
  socketLogLevel: 1,
  expressLogger: true,
  facebook: {
    clientID: '1740076149537313',
    clientSecret: 'bb8f58f9ad6d3fb73d3882690a157792',
    callbackURL: 'http://localhost:' + port + '/auth/facebook/callback'
  }
};
