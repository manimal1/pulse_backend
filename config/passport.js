var passport = require('passport');
var mongoose = require('mongoose');

/**
 * Passport Configuration
 */
module.exports = function() {
  // var User = mongoose.model('Account');
  var User = require('../app/models/account');

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
      },
      '-password',
      function(err, user) {
        done(err, user);
      }
    );
  });

  require('./strategies/local.js')();
  require('./strategies/facebook.js')();
};
