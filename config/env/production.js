var port = process.env.PORT || 3000;
var MONGO_URL = 'mongodb://root:ev9opOguvu@waffle.modulusmongo.net:27017/piraN6eq?autoReconnect=true&connectTimeoutMS=60000';

module.exports = {
  port: port,
  db: MONGO_URL,
  secret: 'mysupersupersecret',
  socketLogLevel: 0,
  expressLogger: false,
  facebook: {
    clientID: '1740076149537313',
    clientSecret: 'bb8f58f9ad6d3fb73d3882690a157792',
    callbackURL: 'http://pulse-app-67713.onmodulus.net/auth/facebook/callback'
  }
};
